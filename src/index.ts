import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import { authChecker } from './auth';
import { resolveContext } from './context';

// register 3rd party IOC container
TypeGraphQL.useContainer(Container);
TypeORM.useContainer(Container);

async function bootstrap() {
    try {
        console.log();
        console.log('##########################################################');
        console.log('#####           CONNECTING TO DATABASE               #####');
        console.log('##########################################################');
        console.log();

        // create TypeORM connection
        await TypeORM.createConnection();

        // build TypeGraphQL executable schema
        const schema = await TypeGraphQL.buildSchema({
            resolvers: [__dirname + '/resolvers/!(*.spec.ts)'],
            authChecker,
        });

        // Create GraphQL server
        const server = new ApolloServer({
            schema,
            playground: true,
            context: resolveContext,
        });

        const app = express();
        const path = '*';

        // Apply the GraphQL server middleware
        server.applyMiddleware({ app, path });

        // Start the server

        console.log();
        console.log('##########################################################');
        console.log('#####               STARTING SERVER                  #####');
        console.log('##########################################################');
        console.log();

        app.listen({ port: 4000 }, () => {
            console.log(`🚀 Server ready at http://localhost:4000`);
        });
    } catch (err) {
        console.error(err);
    }
}

bootstrap();
