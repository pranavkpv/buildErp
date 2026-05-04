import express, { Request, Response, NextFunction, Express } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import fileUpload from "express-fileupload";
import onFinished from "on-finished";
import passport from "passport";
import dotenv from "dotenv";

import { errorHandler } from "./src/infrastructure/middlewares/errorHandler";
import { SitemanagerRoute } from "./src/api/routes/Sitemanager/siteRouter";
import { AdminRoute } from "./src/api/routes/Admin/adminRouter";
import { UserRoute } from "./src/api/routes/User/userRouter";
import { AuthRoute } from "./src/api/routes/Auth/authRouter";
import { ROUTE_PATHS } from "./src/Shared/Constants/Routepath";
import logger from "./src/infrastructure/logger/logger";

dotenv.config();

export const createApp = (): Express => {
  const app = express();

  // ✅ CORS
  app.use(
    cors({
      origin: [
        "http://localhost:5173",
        "https://93f4stm6-5173.inc1.devtunnels.ms",
        "https://build-front-erp.tastetrial.info",
      ],
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
      credentials: true,
    })
  );

  app.use(cookieParser());

  // ✅ Webhook-safe JSON parsing
  app.use((req, res, next) => {
    if (req.originalUrl === "/user/payment/webhook") return next();
    express.json()(req, res, next);
  });

  app.use(express.urlencoded({ extended: true }));

  app.use(fileUpload({ useTempFiles: true }));

  // ✅ Logging middleware
  app.use((req: Request, res: Response, next: NextFunction) => {
    onFinished(res, () => {
      const message = res.locals.message || "";
      const status = res.locals.status_code || res.statusCode;

      const logText = `${req.method} ${req.originalUrl} -> ${status} ${message}`;

      if (status >= 500) logger.error(logText);
      else if (status >= 400) logger.warn(logText);
      else logger.info(logText);
    });
    next();
  });

  // ✅ Session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "secret",
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24,
      },
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // ✅ Routes
  app.use(ROUTE_PATHS.AUTH, new AuthRoute().authRoute);
  app.use(ROUTE_PATHS.USER, new UserRoute().userRoute);
  app.use(ROUTE_PATHS.ADMIN, new AdminRoute().adminRoute);
  app.use(ROUTE_PATHS.SITE_MANAGER, new SitemanagerRoute().sitemanagerRoute);

  // ✅ Error handler
  app.use(errorHandler);

  return app;
};