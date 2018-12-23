import {Connection} from 'typeorm';
import User from '../entities/User';
import {PasswordHashingHandler} from '../PasswordHashingHandler';
import AuthenticationService from '../services/AuthenticationService';
import UsersService from '../services/UsersService';

export const createServices = (dbConnection: Connection, passwordHashingHandler: PasswordHashingHandler) => {

    const usersRepository = dbConnection.getRepository(User);

    const usersService = new UsersService(usersRepository);

    const authenticationService = new AuthenticationService(usersRepository, passwordHashingHandler);

    return {
        usersService,
        authenticationService
    };
};
