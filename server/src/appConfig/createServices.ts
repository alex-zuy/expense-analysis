import {EntityManager} from 'typeorm';
import User from '../entities/User';
import UsersService from '../services/UsersService';

export const createServices = (entityManager: EntityManager, currentUser: User) => {
    const usersRepository = entityManager.getRepository(User);

    const usersService = new UsersService(usersRepository, currentUser);

    return {
        usersService,
    };
};

export type ApplicationServices = ReturnType<typeof createServices>;
