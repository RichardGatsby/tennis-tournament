import { AddPlayerRequest } from "../routes/v1/players"
import { query } from "./db"

export interface Player {
    player_id: number,
    name: string
}

export const getPlayers = async (): Promise<Player[]> => {
    const res = await  query('SELECT * FROM public.players')
    return res
}

export const addPlayer = async (data: AddPlayerRequest): Promise<void> => {
    await  query('INSERT INTO public.players(name) VALUES($1)', [data.name])
}

export const deletePlayer = async (playerId: number): Promise<void> => {
    await  query('DELETE FROM public.players WHERE player_id = ($1)', [playerId])
}

