import { getConfig } from "../config";

export interface Player {
  player_id: number;
  name: string;
}
const apiBaseUrl = getConfig().apiUrl
export const getPlayers = async (token: string): Promise<Player[]> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/players`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
  ).json();
  return response;
};
export const addPlayer = async (
  token: string,
  data: {
    name: string;
  }
): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/players`, {
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

export const deletePlayer = async (
  token: string,
  playerId: number
): Promise<boolean> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/admin/players/${playerId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
    })
  ).ok;
  return response;
};
