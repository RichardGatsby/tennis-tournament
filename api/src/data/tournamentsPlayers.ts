import { query } from "./db";
import { Player } from "./players";

export interface TournamentsPlayer {
  tournament_id: number;
  player_id: string;
}

export const getTournamentsPlayers = async (
  tournamentId: number
): Promise<Player[]> => {
  const res = await query(
    "SELECT p.* FROM public.players p LEFT JOIN public.tournaments_players tp ON p.player_id = tp.player_id WHERE tp.tournament_id = ($1)",
    [tournamentId]
  );
  return res;
};

export const addTournamentsPlayer = async (
  tournamentId: number,
  playerId: number
): Promise<void> => {
  await query(
    "INSERT INTO public.tournaments_players(tournament_id, player_id) VALUES($1,$2) RETURNING *",
    [tournamentId, playerId]
  );
};

export const deleteTournamentsPlayer = async (
  playerId: number,
  tournamentId: number
): Promise<void> => {
  await query(
    "DELETE FROM public.players WHERE player_id = ($1) AND tournament_id = ($2)",
    [playerId, tournamentId]
  );
};
