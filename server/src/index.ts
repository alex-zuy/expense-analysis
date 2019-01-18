import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as morgan from 'morgan';
import * as passport from 'passport';
import {createConnection} from 'typeorm';
import {configurePassport} from './appConfig/passport/configurePassport';
import createGraphQlHandler from './controllers/graphQL';
import {login as loginHandler} from './controllers/login';
import User from './entities/User';
import {createGraphQlSchema} from './graphql/createSchema';
import {authorizationErrorHandler, requireAuthentication} from './middleware/authentication';
import {BcryptPasswordHashingHandler} from './PasswordHashingHandler';
import AuthenticationService from './services/AuthenticationService';

createConnection()
    .then(async (connection) => {
        {
            const userRepository = connection.getRepository(User);
            const passwordHashingHandler = new BcryptPasswordHashingHandler();
            const authenticationService = new AuthenticationService(userRepository, passwordHashingHandler);

            configurePassport(passport, authenticationService);
        }

        const app = express();

        app.use(morgan('dev'));
        app.use(expressSession({secret: 'cats', resave: false, saveUninitialized: false}));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/login', loginHandler);

        const GRAPHQL_PATH = '/graphql';
        app.use(GRAPHQL_PATH, requireAuthentication);
        app.use(GRAPHQL_PATH, cors(), createGraphQlHandler(connection, await createGraphQlSchema()));

        app.use(authorizationErrorHandler);

        const port = process.env.LISTENING_PORT;
        app.listen(port, () => {
            console.log(`Listening at ${port}. GraphQL available at '${GRAPHQL_PATH}'`);
        });
    });
