"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = (0, express_1.Router)();
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["email", "profile", "openid", "https://www.googleapis.com/auth/youtube"],
}));
router.get("/google/callback", passport_1.default.authenticate("google", { failureRedirect: "http://localhost:3000/login-failed" }), async (req, res) => {
    res.redirect("http://localhost:3000/home");
});
router.get("/me", (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ authenticated: true, user: req.user });
    }
    else {
        res.status(401).json({ authenticated: false });
    }
});
router.post("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err)
            return next(err);
        res.status(200).json({ message: "Logged out" });
    });
});
exports.default = router;
