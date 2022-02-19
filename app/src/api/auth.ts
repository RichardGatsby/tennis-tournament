import { getConfig } from "../config";

const apiBaseUrl = getConfig().apiUrl;

export const login = async (password: string): Promise<string | null> => {
  const response = await await fetch(`${apiBaseUrl}/v1/auth/token`, {
    headers: {
      Authorization: password,
    },
  });
  if (response.status === 401) {
    return null;
  }
  return response.text();
};
