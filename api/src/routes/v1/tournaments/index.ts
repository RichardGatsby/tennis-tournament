import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getTournaments } from "../../../data/tournament";

const router = express.Router();
router.get(
  "",
  expressAsyncHandler(async (req, res) => {
    res.json(await getTournaments());
  })
);

export default router;
