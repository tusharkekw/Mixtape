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

    let convertedTracks = 0;
    let totalTracksToBeConverted = 0;
    Object.values(selectedPlaylist)?.forEach((p) =>
      p.selectedItems.length === 0
        ? (totalTracksToBeConverted += p.playlistData.itemCount)
        : (totalTracksToBeConverted += p.selectedItems.length ?? 0)
    );

    if (transferMode === "individual") {
      for (let playlist of Object.values(selectedPlaylist)) {
        const { playlistData, selectedItems } = playlist;
        const destinationPlaylistId = await destinationAdapter.createPlaylist(
          destinationAccessToken,
          destinationProvider.providerUserId,
          playlistData.title
        );
        console.log("created destination playlist", destinationPlaylistId);

        let itemsToBeConverted;
        if (!!selectedItems.length) {
          //already have the items for this playlist
          itemsToBeConverted = selectedItems;
        } else {
          // -> fetch playlistItems if complete playlist is selected
          itemsToBeConverted = await sourceAdapter.getPlaylistTracks(sourceAccessToken, playlistData.id);
        }

        // -> iterate over playlistItems
        for (let item of itemsToBeConverted) {
          // -> search for same item on destination platform
          const query = item.title + (item?.artist ?? "");
          let destinationItemId = await destinationAdapter.searchTrack(destinationAccessToken, query);
          // -> add to destination playlist

          await destinationAdapter.addTracksToPlaylist(
            destinationAccessToken,
            destinationPlaylistId,
            destinationItemId
          );
          convertedTracks++;

          if (convertedTracks % 5 === 0) {
            updateJobProgress(job.id, (convertedTracks / totalTracksToBeConverted) * 100);
          }
        }
      }
    } else {
      // 'unified'
      // -> iterate over playlist and cumulate tracks
      //
      let items: any = [];
      for (let playlist of Object.values(selectedPlaylist)) {
        const { selectedItems, playlistData } = playlist;
        if (!!selectedItems.length) {
          items = [...items, ...selectedItems];
        } else {
          const playlistItems = await sourceAdapter.getPlaylistTracks(sourceAccessToken, playlistData.id);
          items = [...items, ...playlistItems];
        }
      }
      // -> create new playlist with playlisName
      const destinationPlaylistId = await destinationAdapter.createPlaylist(
        destinationAccessToken,
        destinationProvider.providerUserId,
        playlistName
      );

      console.log("created destination playlist", destinationPlaylistId);

      // -> add to that playlist
      for (const item of items) {
        const query = item.title + " " + item.artist;
        const destinationItemId = await destinationAdapter.searchTrack(destinationAccessToken, query);
        await destinationAdapter.addTracksToPlaylist(
          destinationAccessToken,
          destinationPlaylistId,
          destinationItemId
        );
        console.log("added track");
        convertedTracks++;
        if (convertedTracks % 5 === 0) {
          updateJobProgress(job.id, (convertedTracks / totalTracksToBeConverted) * 100);
        }
      }
    }

    updateJobProgress(job.id, (convertedTracks / totalTracksToBeConverted) * 100);
  } catch (error) {
    await prisma.conversionJob.update({
      where: { id: job.id },
      data: { status: "FAILED", result: (error as Error).message },
    });

    throw error;
  }
};

const ADAPTER_REGISTRY: Record<Platform, PlatformAdapter> = {
  spotify: SpotifyAdapter,
  google: GoogleAdapter,
};
