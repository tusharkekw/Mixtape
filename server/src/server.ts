import express from "express";
import { PrismaClient } from "@prisma/client";
import cookieParser from "cookie-parser";
import cors from "cors";
import passport from "passport";
import jwt from "jsonwebtoken";
import session from "express-session";
import authRoutes from "./routes/authRoutes";
import connectRoutes from "./routes/connectRoutes";
import dotenv from "dotenv";
import "./auth/google";
import "./auth/passport";
import "./auth/spotify";
import fetchRoutes from "./routes/fetchRoutes";

const app = express();
dotenv.config();
app.use(
  cors({
    origin: "http://127.0.0.1:3000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    // store: new pgStore({
    //   conString: process.env.DATABASE_URL, // Your Supabase connection string
    //   createTableIfMissing: false, // We created it manually
    // }),
    secret: process.env.SESSION_SECRET!,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
      httpOnly: true, // Frontend cannot access cookie (Security)
      secure: process.env.NODE_ENV === "production", // true if using https
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // adjustments for cross-site if needed
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
  console.log(
    `Request to ${req.url} - Session ID: ${req.sessionID} - User: ${
      req.user ? (req.user as any).id : "undefined"
    }`
  );
  next();
});

app.use("/auth", authRoutes);
app.use("/connect", connectRoutes);
app.use("/fetch", fetchRoutes);

app.listen(3001, () => {
  console.log("server running on 3001");
});
