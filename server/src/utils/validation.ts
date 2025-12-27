import { z } from "zod";

const PlaylistItemSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  platform: z.string(),
  // Add other fields from PlaylistItem if needed
});

const PlaylistDataSchema = z.object({
  id: z.string(),
  title: z.string(),
  thumbnail: z.string(),
  itemCount: z.number(),
  platform: z.string(), // or z.enum(["spotify", "google"]) if we want strictness
});

const SelectedPlaylistDataSchema = z.object({
  playlistData: PlaylistDataSchema,
  isPlaylistSelected: z.boolean(),
  selectedItems: z.array(PlaylistItemSchema),
});

const SelectionStateSchema = z.record(z.string(), SelectedPlaylistDataSchema);

export const TransferPayloadSchema = z.object({
  source: z.string(),
  destination: z.string(),
  selectedPlaylist: SelectionStateSchema,
  transferMode: z.enum(["unified", "individual"]),
  playlistName: z.string().optional(), // It might be empty string or null in types
});

export type TransferPayload = z.infer<typeof TransferPayloadSchema>;
