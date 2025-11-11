import passport from "passport";
import { UserModel } from "../db";
var GoogleStrategy = require("passport-google-oauth20").Strategy;

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";
require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${BACKEND_URL}/google/callback`,
    },

    // @ts-ignore
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        let user = await UserModel.findOne({ email });

        if (!user) {
          user = await UserModel.create({
            email,
            name: profile.displayName,
            password: "",
            image: profile.photos?.[0]?.value ?? null,
          });
          console.log("🆕 New user created:", user.email);
        } else {
          console.log("✅ Existing user logged in:", user.email);
        }

        done(null, user);
      } catch (err) {
        return done(err as Error);
      }
    }
  )
);

passport.serializeUser((user: any, done) => done(null, user.email));
passport.deserializeUser(async (email: string, done) => {
  try {
    const user = await UserModel.findOne({ email });
    done(null, user);
  } catch (err) {
    done(err);
  }
});
