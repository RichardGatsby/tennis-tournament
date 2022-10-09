import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Decoders as D, runDecoderE, GetType } from "typed-decoders";
import { addMatches, deleteAllMatches } from "../../../../data/matches";

const router = express.Router();

const AddMatch = D.Obj({
  player_one_id: D.Num,
  player_two_id: D.Num,
  match_type: D.Str,
  tournament_id: D.Num
});

export type AddMatch = GetType<typeof AddMatch>;
router.post(
  "",
  expressAsyncHandler(async (req, res) => {
    res.json(await addMatches(runDecoderE(D.Arr(AddMatch), req.body)));
  })
);

router.delete(
  "/reset",
  expressAsyncHandler(async (_, res) => {
    res.json(await deleteAllMatches());
  })
);

export default router;
