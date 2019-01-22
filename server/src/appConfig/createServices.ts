import {EntityManager} from 'typeorm';
import ShopAccount from '../entities/ShopAccount';
import User from '../entities/User';
import ShopAccountsService from '../services/ShopAccountsService';
import UsersService from '../services/UsersService';

export const createServices = (entityManager: EntityManager, currentUser: User) => {
    const usersRepository = entityManager.getRepository(User);
    const shopAccountsRepository = entityManager.getRepository(ShopAccount);

    const usersService = new UsersService(usersRepository, currentUser);
    const shopAccountsService = new ShopAccountsService(shopAccountsRepository, currentUser);

    return {
        usersService,
        shopAccountsService
    };
};

export type ApplicationServices = ReturnType<typeof createServices>;
