import { googlAuthUseCase } from "../../useCases/user/Authentication/GoogleAuthUseCase";
import { UserRepository } from "../persistence/UserRepository";
import dotenv from "dotenv"
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { JwtServiceImpl } from "../../services/JwtService";
import { Profile,VerifyCallback  } from "passport-google-oauth20";


dotenv.config()

const userRepository = new UserRepository()
const jwtService = new JwtServiceImpl()
const newgoogleAuthUseCase = new googlAuthUseCase(userRepository,jwtService)

passport.use(
   new GoogleStrategy(
      {
         clientID:process.env.GOOGLE_CLIENT_ID as string,
         clientSecret:process.env.GOOGLE_CLIENT_SECRET as string,
         callbackURL:`${process.env.URL}/auth/google/callback`
      },
      async (_accessToken, _refreshToken, profile:Profile, done) =>{
         try {
            const user = await newgoogleAuthUseCase.execute(profile)
            return done(null, user);
         } catch (error) {
             return done(error as Error,false);
         }
      }
   )
)

passport.serializeUser((user: any, done:VerifyCallback) => {
  done(null, user);
});

passport.deserializeUser((user: any, done) => {
  done(null, user);
});