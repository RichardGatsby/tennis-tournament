import { getConfig } from "../config";
import { Player } from "./playersApi";

export interface Tournament {
  tournament_id: number;
  tournament_type: string;
  start_dt: Date;
  end_dt: Date;
  name: string;
}
const apiBaseUrl = getConfig().apiUrl;

export const getTournaments = async (token: string): Promise<Tournament> => {
  const response = await await fetch(`${apiBaseUrl}/v1/tournaments`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  if (response.status === 401) {
    throw response.json();
  }
  return response.json();
};

interface AddTournament {
  tournament_type: string;
  name: string;
}
export const addTournament = async (
  token: string,
  data: AddTournament
): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/admin/tournaments`, {
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

export const endTournament = async (
  token: string,
  tournamentId: number
): Promise<void> => {
  await fetch(`${apiBaseUrl}/v1/admin/tournaments/${tournamentId}/end`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
};

export const getTournamentsPlayers = async (
  token: string,
  tournamentId: number
): Promise<Player[]> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/tournaments/${tournamentId}/players`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
  ).json();
  return response;
};

interface AddTournamentPlayer {
  player_id: number;
}
export const addTournamentsPlayer = async (
  token: string,
  tournamentId: number,
  data: AddTournamentPlayer
): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/tournaments/${tournamentId}/players`, {
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

export const deleteTournamentsPlayer = async (
  token: string,
  tournamentId: number,
  playerId: number
): Promise<boolean> => {
  const response = await (
    await fetch(
      `${apiBaseUrl}/v1/tournaments/${tournamentId}p/layers/${playerId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      }
    )
  ).ok;
  return response;
};
