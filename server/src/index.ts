import { ApolloServer, gql } from 'apollo-server-express';

import {createConnection} from 'typeorm';

import * as express from 'express';
import * as morgan from 'morgan';
import * as passport from 'passport';
import {Strategy} from 'passport-local';
import * as expressSession from 'express-session';
import * as bodyParser from 'body-parser';

import * as crypto from 'crypto';

import User from './entities/User';

const app = express();

const typeDefs = gql`
    type User {
        id: Int
        email: String
    }
    
    type Query {
        self: User
    }
`;

const resolvers = {
    Query: {
        self: () => ({id: 1, email: 'em'}),
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

app.use(morgan('dev'));

const hashPassword = async (rawPassword: string) => {
    return crypto.createHash('md5').update(rawPassword).digest('hex');
};


createConnection()
    .then((connection) => {

        const userRepository = connection.getRepository(User);

        passport.use('local', new Strategy(
            async (username, providedPassword, done) => {
                try {
                    const user = await userRepository.createQueryBuilder('u')
                        .select(['u.id', 'u.email', 'u.password'])
                        .where({email: username})
                        .getOne();

                    const providedPasswordHash = await hashPassword(providedPassword);

                    if (user !== undefined && user.password === providedPasswordHash) {
                        done(null, user);
                    } else {
                        done(null, false, {message: 'Incorrect username or password'})
                    }
                } catch (e) {
                    done(e, false);
                }
            }
        ));

        passport.serializeUser((user: User, done) => {
            done(null, user.id);
        });

        passport.deserializeUser(async (id: number, done) => {
            try {
                const user = await userRepository.findOneOrFail({id});
                done(null, user);
            } catch (e) {
                done(e, false);
            }
        });

        app.use(expressSession({secret: 'cats', resave: false, saveUninitialized: false}));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/login', passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
        }));

        server.applyMiddleware({app});

        const port = process.env.LISTENING_PORT;
        app.listen(port, () => {
            console.log(`Listening at ${port}. GraphQL available at '${server.graphqlPath}'`);
        });
    });
