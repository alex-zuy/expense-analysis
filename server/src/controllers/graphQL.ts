import {RequestHandler} from 'express';
import * as graphqlMiddleware from 'express-graphql';
import {GraphQLSchema} from 'graphql';
import {Connection} from 'typeorm';
import {createServices} from '../appConfig/createServices';
import {ResolverContext} from '../graphql/resolver';
import resolvers from '../graphql/rootResolvers';

const createHandler = (dbConnection: Connection, schema: GraphQLSchema): RequestHandler =>
    (req, res) => {
        dbConnection.manager.transaction('SERIALIZABLE', async (entityManger) => {

            await graphqlMiddleware((req, res, graphQLParams) => {

                const context: ResolverContext = {
                    services: createServices(entityManger, req.user)
                };

                return {
                    schema,
                    graphiql: true,
                    rootValue: resolvers,
                    context
                }
            })(req, res);
        });
    };

export default createHandler;
