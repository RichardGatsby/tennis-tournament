import { BadRequestError, NotFoundError } from "../errors";
import { dbClient } from "./config";

export const getAllPlayers = () => dbClient.players.findMany();

export const createPlayer = async ({ name }: { name: string }) => {
  return dbClient.players.create({
    data: {
      name,
    },
  });
};

export const deletePlayer = async ({ player_id }: { player_id: number }) => {
  try {
    const user = await dbClient.players.findUnique({
      where: {
        player_id,
      },
    });

    if (!user) {
      throw new NotFoundError({
        path: ["deletePlayer"],
        message: "Player not found",
      });
    }
    return await dbClient.players.delete({ where: { player_id } });
  } catch (e) {
    // For valid error handling we would need to filter the errors by returned code and throw accordingly
    // e.g. P2003 = foreignkey reference error (which we originally wanted to catch here)
    const { code, meta } = e;
    throw new BadRequestError({
      path: ["deletePlayer"],
      message: `${code} ${JSON.stringify(meta)}`,
    });
  }
};
