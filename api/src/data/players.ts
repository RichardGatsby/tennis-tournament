import { AddPlayerRequest } from "../routes/v1/players"
import { query } from "./db"

export interface Player {
    player_id: number,
    name: string
}

export const getPlayers = async (tournamentId?: number): Promise<Player[]> => {
    const res = await  query('SELECT * FROM public.players')
    return res
}

export const addPlayer = async (data: AddPlayerRequest): Promise<Player> => {
   const result = await  query('INSERT INTO public.players(name) VALUES($1) RETURNING *', [data.name])
   return result[0]
}

export const deletePlayer = async (playerId: number): Promise<void> => {
    await  query('DELETE FROM public.players WHERE player_id = ($1)', [playerId])
}

