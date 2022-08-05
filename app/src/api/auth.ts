import { getConfig } from "../config";

const apiBaseUrl = getConfig().apiUrl;

export const login = async (password: string): Promise<boolean> => {
  const response = await fetch(`${apiBaseUrl}/v1/auth/token`, {
    headers: {
      Authorization: password,
    },
    credentials: "include",
  });
  return response.status === 200;
};
