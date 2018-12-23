import {Connection} from 'typeorm';
import User from '../entities/User';
import {passwordHashFunction} from '../passwordHash';
import AuthenticationService from '../services/AuthenticationService';
import UsersService from '../services/UsersService';

export const createServices = (dbConnection: Connection) => {

    const usersRepository = dbConnection.getRepository(User);

    const usersService = new UsersService(usersRepository);

    const authenticationService = new AuthenticationService(usersRepository, passwordHashFunction);

    return {
        usersService,
        authenticationService
    };
};
