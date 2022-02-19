import { getConfig } from "../config";

export interface Game {
  match_id: number;
  player_one_id: number;
  player_one_name: string;
  player_two_id: number;
  player_two_name: string;
  player_one_score: number;
  player_two_score: number;
  winner: number;
}
const apiBaseUrl = getConfig().apiUrl;

export const getMatches = async (
  tournamentId: number,
  token: string
): Promise<Game[]> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/matches?tournamentId=${tournamentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
  ).json();
  return response;
};

interface CreateMatch {
  player_one_id: number;
  player_two_id: number;
  match_type: string;
}
export const addMatches = async (
  token: string,
  data: CreateMatch[]
): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/admin/matches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
  ).ok;
  return response;
};

export const addMatchScore = async (
  token: string,
  matchId: number,
  data: {
    player_one_score: number;
    player_two_score: number;
    winner_id: number | undefined;
  }
): Promise<Game[]> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/matches/${matchId}/score`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(data),
    })
  ).json();
  return response;
};

export const removeAllMatches = async (token: string): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/admin/matches/reset`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
  ).ok;
  return response;
};
