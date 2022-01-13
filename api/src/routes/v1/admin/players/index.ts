import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Decoders as D, runDecoderE,  } from "typed-decoders";
import { deletePlayer } from "../../../../data/players";

const router = express.Router();

router.delete(
  "/:id",
  expressAsyncHandler(async (req, res) => {
    res.json(await deletePlayer(runDecoderE(D.Num, parseInt(req.params.id))));
  })
);

export default router;
