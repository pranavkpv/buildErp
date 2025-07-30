import cors from 'cors';
import cookieParser from 'cookie-parser';
import session from "express-session";
import fileUpload from 'express-fileupload';
import logger from "./src/Shared/utils/logger";
import express, { Request, Response, NextFunction, Express } from "express";
import { connectMongo } from './src/Database/DB/ConnectDB';
import { errorHandler } from './src/middlewares/errorHandler';
import onFinished from 'on-finished';
import passport from 'passport';
import http from 'http'; // ✅ Missing import
import { userRoute } from './src/infrastructure/web/routes/userRouter';
import { AdminRoute } from './src/infrastructure/web/routes/adminRouter';
import { SitemanagerRoute } from './src/infrastructure/web/routes/siteRouter';

require("dotenv").config();

export class App {
   private app: Express;
   private server: http.Server; // ✅ Declare server
   private database: connectMongo;

   constructor() {
      this.app = express();
      this.database = new connectMongo(); // ✅ Assign instance
      this.database.connectDb();
      this.server = http.createServer(this.app);
      this.setMiddlewares();
      this.setUserRoute();
      this.setAdminRoute();
      this.setSitemanagerRoute();
   }

   private setMiddlewares() {
      this.app.use(cors({
         origin: 'http://localhost:5173',
         credentials: true
      }));
      this.app.use(cookieParser());
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: true }));
      this.app.use(fileUpload({ useTempFiles: true }));

      this.app.use((req: Request, res: Response, next: NextFunction) => {
         onFinished(res, () => {
            const message = res.locals.message;
            const status = res.locals.status_code;
            const logText = `${ req.method } ${ req.originalUrl } -> ${ status } ${ message }`;

            if (status >= 500) logger.error(logText);
            else if (status >= 400) logger.warn(logText);
            else logger.info(logText);
         });
         next();
      });

      this.app.use(session({
         secret: process.env.SESSION_SECRET || 'your-secret-key',
         resave: false,
         saveUninitialized: false,
         cookie: {
            secure: false,
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24
         }
      }));

      this.app.use(passport.initialize());
      this.app.use(passport.session());
   }

   private setUserRoute() {
      this.app.use('/', new userRoute().userRoute);
   }

   private setAdminRoute() {
      this.app.use("/admin", new AdminRoute().adminRoute);
   }

   private setSitemanagerRoute() {
      this.app.use('/site', new SitemanagerRoute().sitemanagerRoute);
   }

   public listen() {
      const port = process.env.PORT || 3000;
      this.server.listen(port, () => console.log(`server running on ${ port }`));
   }
}

const app = new App()
app.listen()