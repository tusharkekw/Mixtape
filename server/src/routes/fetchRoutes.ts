import { Router } from "express";
import { fetchPlaylist } from "../services/playlist/playlist-service";
import { fetchPlaylistData } from "../services/playlist/playlist-item.service";

import { ensureAuthenticated } from "../auth/middleware";

const router = Router();

router.use(ensureAuthenticated);

router.get("/playlist/:platformId", fetchPlaylist);

router.get("/playlist-items/:platformId/:playlistId", fetchPlaylistData);

export default router;
