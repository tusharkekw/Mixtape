import passport from "passport";
import { Strategy as SpotifyStrategy } from "passport-spotify";
import prisma from "../lib/prisma";

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID!,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET!,
      callbackURL: process.env.SPOTIFY_CALLBACK_URL!, // e.g., http://localhost:3000/auth/spotify/callback
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, expires_in, profile, done) => {
      try {
        if (!req.user) {
          return done(new Error("User must be logged in"));
        }

        const userId = profile.id;

        await prisma.provider.upsert({
          where: {
            provider_providerUserId: {
              provider: "spotify",
              providerUserId: userId,
            },
          },
          create: {
            provider: "spotify",
            providerUserId: profile.id, // Spotify's User ID
            accessToken: accessToken,
            refreshToken: refreshToken,
            userId: (req.user as any)?.id,
            expiresAt: new Date(expires_in),
          },
          update: {
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
        });

        return done(null, req.user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

export default passport;
