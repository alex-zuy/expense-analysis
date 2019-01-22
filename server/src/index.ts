import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as expressSession from 'express-session';
import * as sessionFileStore from 'session-file-store';
import * as morgan from 'morgan';
import * as passport from 'passport';
import {createConnection} from 'typeorm';
import {configurePassport} from './appConfig/passport/configurePassport';
import createGraphQlHandler from './controllers/graphQL';
import {logIn as loginHandler} from './controllers/logIn';
import {isLoggedIn} from './controllers/isLoggedIn';
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
        const FileStore = sessionFileStore(expressSession);
        app.use(expressSession({
            store: new FileStore({
                path: './.sessions'
            }),
            secret: 'cats',
            resave: false,
            saveUninitialized: false
        }));
        app.use(bodyParser.urlencoded({extended: false}));
        app.use(bodyParser.json());
        app.use(passport.initialize());
        app.use(passport.session());

        app.post('/login', loginHandler);
        app.get('/loggedIn', isLoggedIn);

        const GRAPHQL_PATH = '/graphql';
        app.use(GRAPHQL_PATH, requireAuthentication);
        app.use(GRAPHQL_PATH, cors(), createGraphQlHandler(connection, await createGraphQlSchema()));

        app.use(authorizationErrorHandler);

        const port = process.env.LISTENING_PORT;
        app.listen(port, () => {
            console.log(`Listening at ${port}. GraphQL available at '${GRAPHQL_PATH}'`);
        });
    });
