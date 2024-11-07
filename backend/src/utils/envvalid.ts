
import { cleanEnv, str, port } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port(),
  MONGO_URI: str(),
  JWT_SECRET: str(),
  RAZ_KEY_ID: str(),
  RAZ_SECRET_KEY: str(),
  ENVIRONMENT: str(),
  FRONTENT_URL: str(),
  FRONTENT_URL_DEPLOYED: str(),
});
