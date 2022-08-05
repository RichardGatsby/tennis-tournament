import "dotenv/config";
import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { buildSchemaSync } from "type-graphql";

import { PlayerResolver } from "./graphql/resolvers";

const server = new ApolloServer({
  schema: buildSchemaSync({
    resolvers: [PlayerResolver],
  }),
});

server.listen({ port: process.env.PORT }).then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
