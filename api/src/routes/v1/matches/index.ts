import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Decoders as D, runDecoderE, GetType } from "typed-decoders";
import {
  addMatchScore,
  deleteAllMatches,
  getMatches,
  Match,
} from "../../../data/matches";
import { StringToNumber } from "../../../utils/typed-decoders";

const router = express.Router();

const GetMatchesQuery = D.Obj({}, {
    tournamentId: StringToNumber
});

export type GetMatchesQuery = GetType<typeof GetMatchesQuery>;router.get(
  "",
  expressAsyncHandler<Match[]>(async (req, res) => {
    const query = runDecoderE(GetMatchesQuery, req.query)
    res.json(await getMatches(query.tournamentId));
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
  expressAsyncHandler(async (_, res) => {
    res.json(await deleteAllMatches());
  })
);

export default router;
