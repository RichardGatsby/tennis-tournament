import express from "express";
import expressAsyncHandler from "express-async-handler";
import { Decoders as D, runDecoderE, GetType } from "typed-decoders";
import { addTournament, endTournament } from "../../../../data/tournament";

const router = express.Router();

const AddTournament = D.Obj({
  tournament_type: D.Str,
  name: D.Str,
});

export type AddTournament = GetType<typeof AddTournament>;

router.post(
  "",
  expressAsyncHandler(async (req, res) => {
    res.json(await addTournament(runDecoderE(AddTournament, req.body)));
  })
);

router.post(
  "/:tournamentId/end",
  expressAsyncHandler(async (req, res) => {
    res.json(await endTournament(parseInt(req.params.tournamentId)));
  })
);

export default router;
