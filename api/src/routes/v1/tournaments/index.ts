import express from "express";
import expressAsyncHandler from "express-async-handler";
import { getTournaments } from "../../../data/tournament";
import { addTournamentsPlayer, deleteTournamentsPlayer, getTournamentsPlayers } from "../../../data/tournamentsPlayers";
import { Decoders as D, runDecoderE } from "typed-decoders";


const router = express.Router();

router.get(
  "",
  expressAsyncHandler(async (_, res) => {
    res.json(await getTournaments());
  })
);

router.post(
  "/:tournamentId/players",
  expressAsyncHandler(async (req, res) => {
    const tournamentId = runDecoderE(D.Num, parseInt(req.params.tournamentId))
    const playerId = runDecoderE(D.Num, parseInt(req.body.player_id))

    res.json(await addTournamentsPlayer(tournamentId, playerId));
  })
);

router.delete(
  "/:tournamentId/players/:playerId",
  expressAsyncHandler(async (req, res) => {
    const tournamentId = runDecoderE(D.Num, parseInt(req.params.tournamentId))
    const playerId = runDecoderE(D.Num, parseInt(req.params.playerId))

    res.json(await deleteTournamentsPlayer(tournamentId, playerId));
  })
);

router.get(
  "/:tournamentId/players",
  expressAsyncHandler(async (req, res) => {
    const tournamentId = runDecoderE(D.Num, parseInt(req.params.tournamentId))
    res.json(await getTournamentsPlayers(tournamentId));
  })
);



export default router;
