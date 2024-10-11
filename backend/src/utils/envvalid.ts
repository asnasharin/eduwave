import dotenv from "dotenv";
dotenv.config(); 

import { cleanEnv, str, port } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  ENVIRONMENT: str(),
});
