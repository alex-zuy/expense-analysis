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

            //TODO: find a way to catch exceptions that happened inside GraphQl resolvers code
            await graphqlMiddleware((req, res, graphQLParams) => {

                const {user} = req;

                const context: ResolverContext = {
                    currentUser: user,
                    services: createServices(entityManger, user)
                };

                return {
                    schema,
                    graphiql: true,
                    context
                }
            })(req, res);
        });
    };

export default createHandler;
