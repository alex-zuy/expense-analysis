import {ApolloServer, gql} from 'apollo-server-express';
import * as bodyParser from 'body-parser';

import * as express from 'express';
import * as expressSession from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';

import {createConnection} from 'typeorm';
import {createServices} from './appConfig/createServices';
import {configurePassport} from './appConfig/passport/configurePassport';
import {login as loginHandler} from './controllers/login';
import {requireAuthentication, authorizationErrorHandler} from './middleware/authentication';
import {BcryptPasswordHashingHandler} from './PasswordHashingHandler';

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

createConnection()
    .then((connection) => {
        const passwordHashingHandler = new BcryptPasswordHashingHandler();

        const services = createServices(connection, passwordHashingHandler);

        configurePassport(passport, services.authenticationService);

        const app = express();

        app.use(morgan('dev'));
        app.use(expressSession({secret: 'cats', resave: false, saveUninitialized: false}));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/login', loginHandler);

        const apollo = new ApolloServer({ typeDefs, resolvers });

        app.use(apollo.graphqlPath, requireAuthentication);
        apollo.applyMiddleware({app});

        app.use(authorizationErrorHandler);

        const port = process.env.LISTENING_PORT;
        app.listen(port, () => {
            console.log(`Listening at ${port}. GraphQL available at '${apollo.graphqlPath}'`);
        });
    });
