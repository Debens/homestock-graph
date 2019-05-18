import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import depthLimit from 'graphql-depth-limit';
import 'reflect-metadata';
import * as TypeGraphQL from 'type-graphql';
import { Container } from 'typedi';
import * as TypeORM from 'typeorm';

import { authChecker } from './auth';
import { resolveContext } from './context';

async function bootstrap() {
    try {
        console.log();
        console.log('##########################################################');
        console.log('#####           CONNECTING TO DATABASE               #####');
        console.log('##########################################################');
        console.log();

        // create TypeORM connection
        TypeORM.useContainer(Container);
        await TypeORM.createConnection();

        console.log();
        console.log('##########################################################');
        console.log('########           BUILDING SCHEMA               #########');
        console.log('##########################################################');
        console.log();

        // build TypeGraphQL executable schema
        const schema = await TypeGraphQL.buildSchema({
            authChecker,
            container: Container,
            resolvers: [__dirname + '/resolvers/*.js!(*.spec.js)'],
            validate: false,
        });

        console.log();
        console.log('##########################################################');
        console.log('#####               CREATING SERVER                  #####');
        console.log('##########################################################');
        console.log();

        // Create GraphQL server
        const queryDepthLimit = parseInt(process.env.QUERY_DEPTH_LIMIT, 10) || 10;
        const server = new ApolloServer({
            context: resolveContext,
            playground: process.env.NODE_ENV !== 'production',
            schema,
            validationRules: [depthLimit(queryDepthLimit)],
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

        const port = process.env.PORT || 4000;
        app.listen({ port }, () => {
            console.log(`🚀 Server ready at http://localhost:${port}`);
            console.log();
        });
    } catch (err) {
        console.error(err);
    }
}

bootstrap();
