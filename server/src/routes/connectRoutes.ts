import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: [
      "user-read-private",
      "user-read-email",
      "playlist-modify-private",
      "playlist-read-collaborative",
      "playlist-read-private",
      "playlist-modify-public",
    ],
  })
);

router.get(
  "/spotify/callback/",
  passport.authenticate("spotify", { failureRedirect: "http://127.0.0.1:3000/connect-failed" }),
  async (req, res) => {
    res.redirect("http://127.0.0.1:3000/transfer");
  }
);

export default router;
