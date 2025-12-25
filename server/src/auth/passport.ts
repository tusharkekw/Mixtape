import passport from "passport";
import prisma from "../lib/prisma";

passport.serializeUser((user: any, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        providers: true,
      },
    });
    done(null, user); // Attach full user object to req.user
  } catch (err) {
    done(err, null);
  }
});
