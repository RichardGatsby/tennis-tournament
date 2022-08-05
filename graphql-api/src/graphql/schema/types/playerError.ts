import { Field, ObjectType } from "type-graphql";
import { ErrorCode } from "../enums/errorCode";

@ObjectType()
export class PlayerError {
  @Field({ description: "An optional error code for clients to match on" })
  @Field(() => ErrorCode)
  code: ErrorCode;

  @Field({ description: "The error message" })
  message: string;

  @Field(() => [String], {
    nullable: true,
    description:
      "Indicates which field cause the error, if any - Field is an array that acts as a path to the error",
  })
  path?: [string];
}
