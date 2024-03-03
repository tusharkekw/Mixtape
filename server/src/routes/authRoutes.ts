import { Router } from "express";
import passport from "passport";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile", "openid", "https://www.googleapis.com/auth/youtube"],
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "http://127.0.0.1:3000/login-failed" }),
  async (req, res) => {
    res.redirect("http://127.0.0.1:3000/home");
  }
);

router.get("/me", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ authenticated: true, user: req.user });
  } else {
    res.json({ authenticated: false, user: null });
  }
});

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.status(200).json({ message: "Logged out" });
  });
});

export default router;
