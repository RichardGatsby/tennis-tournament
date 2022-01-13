import express, { Request } from "express";
import expressAsyncHandler from "express-async-handler";
import { Decoders as D, runDecoderE, GetType } from "typed-decoders";
import {
  addMatches,
  addMatchScore,
  deleteAllMatches,
  getMatches,
  Match,
} from "../../../data/matches";

const router = express.Router();
router.get(
  "",
  expressAsyncHandler<Match[]>(async (req, res) => {
    res.json(await getMatches());
  })
);

const AddScoreRequest = D.Obj({
  player_one_score: D.Num,
  player_two_score: D.Num,
}, {
    winner_id: D.Num,
});

export type AddScoreRequest = GetType<typeof AddScoreRequest>;
router.post(
  "/:id/score",
  expressAsyncHandler(async (req, res) => {
    res.json(
      await addMatchScore(
        runDecoderE(D.Num, parseInt(req.params.id)),
        runDecoderE(AddScoreRequest, req.body)
      )
    );
  })
);

router.delete(
  "/reset",
  expressAsyncHandler(async (req, res) => {
    res.json(await deleteAllMatches());
  })
);

export default router;
