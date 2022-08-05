import {
  createUnionType,
  Field,
  ID,
  InputType,
  ObjectType,
} from "type-graphql";
import { ErrorCode } from "../enums/errorCode";
import { PlayerError } from "./PlayerError";

@ObjectType({ description: "Represents a player" })
export class Player {
  @Field(() => ID)
  player_id: number;

  @Field()
  name: string;
}

@ObjectType()
export class CreatePlayerSuccess {
  @Field(() => Player)
  player: Player;
}

export const CreatePlayerPayload = createUnionType({
  name: "CreatePlayerPayload",
  types: () => [CreatePlayerSuccess] as const,
});

@InputType()
export class CreatePlayerInput implements Partial<Player> {
  @Field()
  name: string;
}

@InputType()
export class DeletePlayerInput implements Partial<Player> {
  @Field()
  player_id: number;
}
@ObjectType()
export class DeletePlayerSuccess {
  @Field(() => Player)
  player: Player;
}

@ObjectType()
export class PlayerNotFound implements Partial<PlayerError> {
  @Field(() => ErrorCode)
  code: ErrorCode;

  @Field()
  message: string;
}

@ObjectType()
export class PlayerInTournament implements Partial<PlayerError> {
  @Field(() => ErrorCode)
  code: ErrorCode;

  @Field()
  message: string;
}
export const DeletePlayerPayload = createUnionType({
  name: "DeletePlayer",
  types: () =>
    [DeletePlayerSuccess, PlayerInTournament, PlayerNotFound] as const,
});
