import {ApolloServer, gql} from 'apollo-server-express';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import * as expressSession from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';

import {createConnection} from 'typeorm';
import {createServices} from './appConfig/createServices';
import {configurePassport} from './appConfig/passport/configurePassport';
import {loginHandler} from './appConfig/passport/loginHandler';
import {BcryptPasswordHashingHandler} from './PasswordHashingHandler';

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

createConnection()
    .then((connection) => {
        const passwordHashingHandler = new BcryptPasswordHashingHandler();

        const services = createServices(connection, passwordHashingHandler);

        configurePassport(passport, services.authenticationService);

        app.use(expressSession({secret: 'cats', resave: false, saveUninitialized: false}));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/login', loginHandler);

        server.applyMiddleware({app});

        const port = process.env.LISTENING_PORT;
        app.listen(port, () => {
            console.log(`Listening at ${port}. GraphQL available at '${server.graphqlPath}'`);
        });
    });
