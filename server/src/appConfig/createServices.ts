import {EntityManager} from 'typeorm';
import Product from '../entities/Product';
import Purchase from '../entities/Purchase';
import ShopAccount from '../entities/ShopAccount';
import User from '../entities/User';
import ProductsService from '../services/ProductsService';
import PurchasesService from '../services/PurchasesService';
import ShopAccountsService from '../services/ShopAccountsService';
import UsersService from '../services/UsersService';

export const createServices = (entityManager: EntityManager, currentUser: User) => {
    const usersRepository = entityManager.getRepository(User);
    const shopAccountsRepository = entityManager.getRepository(ShopAccount);
    const productRepository = entityManager.getRepository(Product);
    const purchasesRepository = entityManager.getRepository(Purchase);

    const usersService = new UsersService(usersRepository, currentUser);
    const shopAccountsService = new ShopAccountsService(shopAccountsRepository, currentUser);
    const productsService = new ProductsService(currentUser, productRepository);
    const purchasesService = new PurchasesService(currentUser, productsService, shopAccountsService, purchasesRepository);

    return {
        usersService,
        shopAccountsService,
        productsService,
        purchasesService
    };
};

export type ApplicationServices = ReturnType<typeof createServices>;
