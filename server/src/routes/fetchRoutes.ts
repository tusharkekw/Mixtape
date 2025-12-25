import { Router } from "express";
import { fetchPlaylist } from "../services/playlist/playlist-service";
import { fetchPlaylistData } from "../services/playlist/playlist-item.service";

const router = Router();

router.get("/playlist/:platformId", fetchPlaylist);

router.get("/playlist-items/:platformId/:playlistId", fetchPlaylistData);

export default router;
