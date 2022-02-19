import { getConfig } from "../config";

export interface Player {
  player_id: number;
  name: string;
}
const apiBaseUrl = getConfig().apiUrl;
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
): Promise<Player> => {
  const response = await (
    await fetch(`${apiBaseUrl}/v1/players`, {
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
