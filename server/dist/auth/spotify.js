"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_spotify_1 = require("passport-spotify");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
passport_1.default.serializeUser((user, done) => {
    done(null, user.id); // Save only user ID to the session
});
passport_1.default.deserializeUser(async (id, done) => {
    try {
        const user = await prisma.user.findUnique({ where: { id } });
        done(null, user); // Attach full user object to req.user
    }
    catch (err) {
        done(err, null);
    }
});
// Configure Spotify Strategy
passport_1.default.use(new passport_spotify_1.Strategy({
    clientID: process.env.SPOTIFY_CLIENT_ID,
    clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
    callbackURL: process.env.SPOTIFY_CALLBACK_URL, // e.g., http://localhost:3000/auth/spotify/callback
}, async (accessToken, refreshToken, expires_in, profile, done) => {
    try {
        // 1. Check if this provider account is already linked
        const existingProvider = await prisma.provider.findFirst({
            where: {
                provider: "spotify",
                providerUserId: profile.id,
            },
            include: { user: true },
        });
        const expiresAt = new Date(Date.now() + expires_in * 1000);
        if (existingProvider) {
            // 2. User exists: Update tokens (IMPORTANT for playlist conversion later)
            await prisma.provider.update({
                where: { id: existingProvider.id },
                data: {
                    accessToken,
                    refreshToken,
                    expiresAt,
                },
            });
            return done(null, existingProvider.user);
        }
        // 3. User does not exist: Create User and Provider
        // Note: You might want to check if a user with the same email exists to link accounts,
        // but for now, we create a new user.
        const newUser = await prisma.user.create({
            data: {
                email: profile.emails?.[0].value || `spotify_${profile.id}@no-email.com`, // Spotify doesn't always return email
                name: profile.displayName,
                providers: {
                    create: {
                        provider: "spotify",
                        providerUserId: profile.id,
                        accessToken,
                        refreshToken,
                        expiresAt,
                    },
                },
            },
        });
        return done(null, newUser);
    }
    catch (err) {
        return done(err);
    }
}));
exports.default = passport_1.default;
