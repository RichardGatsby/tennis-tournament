import { createPlayer, deletePlayer, getAllPlayers } from "../../data/players";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import {
  CreatePlayerInput,
  CreatePlayerPayload,
  CreatePlayerSuccess,
  DeletePlayerInput,
  DeletePlayerPayload,
  DeletePlayerSuccess,
  Player,
  PlayerInTournament,
  PlayerNotFound,
} from "../schema/types/player";
import { handleResolverError } from "../../errors";

@Resolver(Player)
export class PlayerResolver {
  @Query(() => [Player], { nullable: "itemsAndList" })
  players() {
    return getAllPlayers();
  }

  @Mutation(() => CreatePlayerPayload)
  async createUser(
    @Arg("data", {
      description: "Represents the input data needed to create a new user",
    })
    { name }: CreatePlayerInput
  ) {
    try {
      return Object.assign(new CreatePlayerSuccess(), {
        user: await createPlayer({ name }),
      });
    } catch (error) {
      return handleResolverError(error, () => {
        const { path, code, message } = error;

        return Object.assign({ code, path, message });
      });
    }
  }

  @Mutation(() => DeletePlayerPayload)
  async deletePlayer(@Arg("data") { player_id }: DeletePlayerInput) {
    try {
      return Object.assign(new DeletePlayerSuccess(), {
        player: await deletePlayer({ player_id }),
      });
    } catch (error) {
      return handleResolverError(error, () => {
        const { code, path, message } = error;
        if (code === 404) {
          return Object.assign(new PlayerNotFound(), { code, message });
        }
        if (code === 400) {
          //TODO: if implemented further add proper error handling since this will now most likely catch all the errors thrown from database :33
          return Object.assign(new PlayerInTournament(), { code, message });
        }

        return Object.assign({ code, path, message });
      });
    }
  }
}
