import { AddTournament } from "../routes/v1/admin/tournaments";
import { query } from "./db";

export interface Tournament {
  tournament_id: number;
  tournament_type: string | null;
  name: number;
  start_dt: number;
  end_date: number;
}

//TODO: Create interface for getAll, getById or use some querybuilder (im feeling a bit sick dupplicating these)
export const getTournaments = async (): Promise<Tournament[]> => {
  const res = await query("SELECT * FROM public.tournaments");
  return res;
};

export const addTournament = async (data: AddTournament): Promise<void> => {
  await query(
    "INSERT INTO public.tournaments (tournament_type, name, start_dt) VALUES ($1, $2, $3)",
    [data.tournament_type, data.name, new Date()]
  );
};

export const endTournament = async (tournamentId: number): Promise<void> => {
  await query(
    "UPDATE public.tournaments SET end_dt = $1 WHERE tournament_id = $2",
    [new Date(), tournamentId]
  );
};
