import { AddMatch } from "../routes/v1/admin/matches";
import { AddScoreRequest } from "../routes/v1/matches";
import { query } from "./db";

export interface Match {
  match_id: number;
  match_type: string;
  player_one_id: number;
  player_two_id: number;
  player_one_score: number;
  player_two_score: number;
  winner: number;
}

export const getMatches = async (tournamentId?: number): Promise<Match[]> => {
  const res = await query(
    `SELECT m.*, p.name as player_one_name, p2.name as player_two_name FROM public.matches m LEFT JOIN public.players p ON m.player_one_id = p.player_id LEFT JOIN public.players p2 ON m.player_two_id = p2.player_id ${tournamentId ? ('WHERE tournament_id = ' +tournamentId):''} ORDER BY match_id`
  );
  return res;
};

export const addMatches = async (data: AddMatch[]): Promise<void> => {
  data.forEach(async (match) => {
    await query(
      "INSERT INTO public.matches (match_type, player_one_id, player_two_id, tournament_id) VALUES ($1, $2, $3, $4)",
      [match.match_type, match.player_one_id, match.player_two_id, match.tournament_id]
    );
  });
};

export const addMatchScore = async (
  matchId: number,
  data: AddScoreRequest
): Promise<Match[]> => {
  const res = await query(
    "UPDATE public.matches SET player_one_score = $1, player_two_score = $2, winner = $3 WHERE match_id = $4",
    [data.player_one_score, data.player_two_score, data.winner_id, matchId]
  );
  return res;
};

export const deleteAllMatches = async (): Promise<Match[]> => {
  const res = await query("DELETE FROM public.matches");
  return res;
};
