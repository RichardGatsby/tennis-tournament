import express from "express";
import createV1Routes  from "./v1";

const router = express.Router();

router.use("/v1", createV1Routes);

export default router;
