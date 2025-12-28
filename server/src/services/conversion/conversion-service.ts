import { ConversionJob } from "@prisma/client";
import prisma from "../../lib/prisma";
import { checkValidAndRefreshToken } from "../../utils/refreshToken";
import { ConversionJobData, Platform, PlatformAdapter } from "../../type";
import { SpotifyAdapter } from "./spotify-adapter";
import { GoogleAdapter } from "./google-adapter";
import { updateJobProgress } from "../../utils/prismaUtils";

export const processConversionLogic = async (job: ConversionJob) => {
  try {
    const { source, destination, selectedPlaylist, transferMode, playlistName } =
      job.data as ConversionJobData;

    const user = await prisma.user.findUnique({
      where: {
        id: job.userId,
      },
      include: {
        providers: true,
      },
    });

    const sourceProvider = user?.providers.find((p) => p.provider === source);
    const destinationProvider = user?.providers.find((p) => p.provider === destination);

    if (!sourceProvider) {
      throw new Error(`Source provider '${source}' not connected`);
    }
    if (!destinationProvider) {
      throw new Error(`Destination provider '${source}' not connected`);
    }

    let sourceAccessToken = await checkValidAndRefreshToken(sourceProvider);
    let destinationAccessToken = await checkValidAndRefreshToken(destinationProvider);

    const sourceAdapter = ADAPTER_REGISTRY[source as Platform];
    const destinationAdapter = ADAPTER_REGISTRY[destination as Platform];

    await updateJobProgress(job.id, 5);

    let totalTracksToBeConverted = 0;
    Object.values(selectedPlaylist).forEach((p) => {
      totalTracksToBeConverted += p.selectedItems.length > 0 
        ? p.selectedItems.length 
        : p.playlistData.itemCount;
    });

    let convertedTracksCount = 0;

    const updateProgress = async () => {
      const percentage = Math.min(99, Math.round((convertedTracksCount / totalTracksToBeConverted) * 95) + 5);
      await updateJobProgress(job.id, percentage);
    };

    if (transferMode === "individual") {
      for (let playlist of Object.values(selectedPlaylist)) {
        const { playlistData, selectedItems } = playlist;
        
        const destinationPlaylistId = await destinationAdapter.createPlaylist(
          destinationAccessToken,
          destinationProvider.providerUserId,
          playlistData.title
        );

        let itemsToTransfer = selectedItems;
        if (itemsToTransfer.length === 0) {
           itemsToTransfer = await sourceAdapter.getPlaylistTracks(sourceAccessToken, playlistData.id);
        }

        await transferItems(
          itemsToTransfer, 
          destinationAdapter, 
          destinationAccessToken, 
          destinationPlaylistId,
          (count) => {
             convertedTracksCount += count;
             if (convertedTracksCount % 5 === 0) updateProgress();
          }
        );
      }
    } else {
      const destinationPlaylistId = await destinationAdapter.createPlaylist(
        destinationAccessToken,
        destinationProvider.providerUserId,
        playlistName || "Unified Mixtape"
      );

      for (let playlist of Object.values(selectedPlaylist)) {
        const { playlistData, selectedItems } = playlist;
        let itemsToTransfer = selectedItems;
        if (itemsToTransfer.length === 0) {
           itemsToTransfer = await sourceAdapter.getPlaylistTracks(sourceAccessToken, playlistData.id);
        }

        await transferItems(
          itemsToTransfer, 
          destinationAdapter, 
          destinationAccessToken, 
          destinationPlaylistId,
          (count) => {
             convertedTracksCount += count;
             if (convertedTracksCount % 5 === 0) updateProgress();
          }
        );
      }
    }

    await updateJobProgress(job.id, 100);
    await prisma.conversionJob.update({
        where: { id: job.id },
        data: { status: "COMPLETED", result: "Success" },
    });

  } catch (error) {
    console.error("Conversion failed", error);
    await prisma.conversionJob.update({
      where: { id: job.id },
      data: { status: "FAILED", result: (error as Error).message },
    });
  }
};

import { pMap } from "../../utils/concurrency";
import { PlaylistItem } from "../playlist/playlist-item.service";

async function transferItems(
  items: PlaylistItem[],
  adapter: PlatformAdapter,
  token: string,
  playlistId: string,
  onProgress: (count: number) => void
) {
  // 1. Search in Parallel (Concurrency 2)
  // We map items to their destination IDs (or null)
  const searchResults = await pMap(items, async (item) => {
    const query = `${item.title} ${item.artist || ""}`;
    try {
      const destId = await adapter.searchTrack(token, query);
      return destId;
    } catch (e) {
      console.log(`Failed to search ${query}`, e);
      return null;
    }
  }, 2);

  const foundIds = searchResults.filter((id): id is string => !!id);
  const missedCount = items.length - foundIds.length;
  if(missedCount > 0) console.log(`Skipped ${missedCount} tracks (not found)`);

  // 2. Add to Playlist (Batch if possible, else Parallel)
  if (adapter.addTracksToPlaylistBatch && foundIds.length > 0) {
    try {
        await adapter.addTracksToPlaylistBatch(token, playlistId, foundIds);
        onProgress(foundIds.length);
    } catch (e) {
        console.error("Batch add failed", e);
        // Fallback to individual? Or just fail.
    }
  } else {
    // Parallel add (Concurrency 3 to be safe with rate limits on mutations)
    await pMap(foundIds, async (id) => {
       try {
         await adapter.addTracksToPlaylist(token, playlistId, id);
         onProgress(1); // Increment progress per track
       } catch (e) {
         console.error(`Failed to add track ${id}`, e);
       }
    }, 3);
  }
  
  // If we batched, we already called onProgress with full count.
  // If individual, we called it per track.
  // However, missed tracks should also count towards "processed" so the progress bar finishes?
  // Current logic: totalTracksToBeConverted based on Source.
  // If we skip tracks, we should technically increment "convertedTracksCount" (or "processedTracksCount")
  // so safe to just add missedCount to progress
  if (missedCount > 0) onProgress(missedCount);
}

const ADAPTER_REGISTRY: Record<Platform, PlatformAdapter> = {
  spotify: SpotifyAdapter,
  google: GoogleAdapter,
};
