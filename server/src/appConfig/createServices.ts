import {EntityManager} from 'typeorm';
import Category from '../entities/Category';
import Product from '../entities/Product';
import Purchase from '../entities/Purchase';
import ShopAccount from '../entities/ShopAccount';
import Tag from '../entities/Tag';
import User from '../entities/User';
import CategoriesService from '../services/CategoriesService';
import ProductsService from '../services/ProductsService';
import PurchasesService from '../services/PurchasesService';
import ShopAccountsService from '../services/ShopAccountsService';
import TagsService from '../services/TagsService';
import UsersService from '../services/UsersService';

export const createServices = (entityManager: EntityManager, currentUser: User) => {
    const usersRepository = entityManager.getRepository(User);
    const shopAccountsRepository = entityManager.getRepository(ShopAccount);
    const productRepository = entityManager.getRepository(Product);
    const purchasesRepository = entityManager.getRepository(Purchase);
    const categoriesRepository = entityManager.getRepository(Category);
    const tagsRepository = entityManager.getRepository(Tag);

    const usersService = new UsersService(usersRepository, currentUser);
    const shopAccountsService = new ShopAccountsService(shopAccountsRepository, currentUser);
    const productsService = new ProductsService(currentUser, productRepository);
    const purchasesService = new PurchasesService(currentUser, productsService, shopAccountsService, purchasesRepository);
    const categoriesService = new CategoriesService(currentUser, categoriesRepository);
    const tagsService = new TagsService(currentUser, tagsRepository);

    return {
        usersService,
        shopAccountsService,
        productsService,
        purchasesService,
        categoriesService,
        tagsService
    };
};

export type ApplicationServices = ReturnType<typeof createServices>;
