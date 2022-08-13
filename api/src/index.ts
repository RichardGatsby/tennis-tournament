import "dotenv/config";
import express, { Application } from "express";
import createRoutes from "./routes";
import cors from "cors";
import { getConfig } from "./config";
import cookieParser from "cookie-parser";

const app: Application = express();

const config = getConfig();
var corsOptions =
  process.env.NODE_ENV === "production"
    ? { credentials: true, origin: config.allowOrigin }
    : {
        origin: "http://localhost:3000",
        credentials: true,
      };
      
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(createRoutes);

try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
