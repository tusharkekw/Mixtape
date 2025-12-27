import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import prisma from "../lib/prisma";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: process.env.GOOGLE_CALLBACK_URL!,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) return done(null, false);

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName,
            },
          });
        }

        await prisma.provider.upsert({
          where: {
            provider_providerUserId: {
              provider: "google",
              providerUserId: profile.id,
            },
          },
          create: {
            provider: "google",
            providerUserId: profile.id,
            userId: user.id,
            accessToken: accessToken,
            refreshToken: refreshToken,
          },
          update: {
            accessToken: accessToken,
            ...(refreshToken && { refreshToken }),
          },
        });

        return done(null, user);
      } catch (err) {
        done(err);
      }
    }
  )
);
