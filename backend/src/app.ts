import express, { Express } from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/userRoute"
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import "dotenv/config";

import { env } from "./utils/envvalid";


const app: Express = express();

const corsConfig = {
  origin:
    env.ENVIRONMENT === "development",
  credentials: true,
};

env.ENVIRONMENT === "development" && app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsConfig));

app.use("/api", userRouter)


//error handler
app.use("*", notFound);
app.use(errorHandler);

export default app;
