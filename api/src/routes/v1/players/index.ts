import express from "express";
import expressAsyncHandler from "express-async-handler";
import { addPlayer, getPlayers } from "../../../data/players";
import { Decoders as D, runDecoderE, GetType } from "typed-decoders";

const router = express.Router();

router.get(
  "",
  expressAsyncHandler(async (_, res) => {
    res.json(await getPlayers());
  })
);

const AddPlayerRequest = D.Obj({ name: D.Str });
export type AddPlayerRequest = GetType<typeof AddPlayerRequest>;

router.post(
  "",
  expressAsyncHandler(async (req, res) => {
    res.json(await addPlayer(runDecoderE(AddPlayerRequest, req.body)));
  })
);

export default router;
