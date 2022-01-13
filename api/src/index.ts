import express, { Application } from "express";
import createRoutes from "./routes";
import dotenv from 'dotenv'
import cors from 'cors'
import { getConfig } from "./config";

const app: Application = express();
dotenv.config()

const config = getConfig();

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(createRoutes);

try {
  app.listen(config.port, (): void => {
    console.log(`Connected successfully on port ${config.port}`);
  });
} catch (error: any) {
  console.error(`Error occured: ${error.message}`);
}
