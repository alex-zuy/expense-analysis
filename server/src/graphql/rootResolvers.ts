import {GraphQLDate, GraphQLDateTime} from 'graphql-iso-date';
import * as _ from 'lodash';
import {type} from 'os';
import ShopDataProvider from '../dataProviders/ShopDataProvider';
import Category from '../entities/Category';
import Product from '../entities/Product';
import Purchase from '../entities/Purchase';
import ShopAccount from '../entities/ShopAccount';
import Tag from '../entities/Tag';
import User from '../entities/User';
import {UpdateAccountFields} from '../services/ShopAccountsService';
import DateRange from './DateRange';
import {composeNodeId, nodeIdResolver} from './node';
import {ResolverFunc} from './resolver';
import * as purchasesGroupResolvers from './resolvers/purchasesGroup';
import * as userResolvers from './resolvers/user';
import * as productResolvers from  './resolvers/product';

const self: ResolverFunc<User> = async (obj, args, {services}) => {
    return services.usersService.getCurrentUser();
};

interface ShopAccountCheckResult {
    isSuccess: boolean,
    error?: string,
    userName?: string
}

const shopAccountCheck: ResolverFunc<ShopAccountCheckResult, undefined, {accessToken: string}> =
    async (obj, args, {services}) => {
        const {accessToken} = args;

        const dataProvider = new ShopDataProvider(accessToken);

        try {
            const account = await dataProvider.getAccountInfo();
            return {
                isSuccess: true,
                userName: [account.firstName, account.lastName].join(' ')
            };
        } catch (e) {
            return {
                isSuccess: false,
                error: e.message
            };
        }
    };

export interface PurchasesGroup {
    id: string,
    purchasedAt: Date,
    items: Purchase[],
    totalPrice: number
}

const purchasesGroups: ResolverFunc<Array<Pick<PurchasesGroup, 'purchasedAt' | 'items'>>, undefined, DateRange> =
    async (source, args, {services}) => {
        const purchases = await services.purchasesService.listPurchases(args);

        const groupsMap = _.groupBy(purchases, (purchase) => purchase.purchasedAt.getTime());

        const groups = Object.entries(groupsMap)
            .map(([dateTimestamp, purchases]) => {
                return {
                    purchasedAt: new Date(Number(dateTimestamp)),
                    items: purchases
                }
            });

        return _.sortBy(groups, (group) => group.purchasedAt.getTime()).reverse();
    };

const categories: ResolverFunc<Category[], undefined> =
    async (source, args, {services}) => {
        return services.categoriesService.listCategories();
    };

const tags: ResolverFunc<Tag[], undefined> =
    (source, args, context) => {
        return context.services.tagsService.listTags();
    };

export interface ProductExpense {
    id: string;
    product: Product;
    expense: number;
}

const productsExpenses: ResolverFunc<ProductExpense, undefined, {}> =
    async (source, args, context, info) => {
        const products = await context.services.productsService.listProducts({
            loadRelationships: ['purchases']
        });

        const expenses = products.map((product) => {
            const purchases = product.purchases!;

            const expense = purchases.reduce(
                (sum, purchase) => sum + purchase.pricePerUnit * purchase.amount,
                0
            );

            return {
                id: composeNodeId('ProductExpense', product.id),
                product,
                expense
            }
        });

        return _.sortBy(expenses, 'expense').reverse();
    };

type UpdateShopAccountInput = UpdateAccountFields;

const updateShopAccount: ResolverFunc<ShopAccount, undefined, {input: UpdateShopAccountInput}> =
    async (obj, args, {services}) => {
        return await services.shopAccountsService.createOrUpdateShopAccountFields(args.input);
    };

const importPurchasesHistory: ResolverFunc<ShopAccount, undefined, {input: DateRange}> =
    async (obj, args, {currentUser, services}) => {
        return services.purchasesService.importPurchasesFromHistory(args.input);
    };

export default {
    Date: GraphQLDate,
    DateTime: GraphQLDateTime,
    Query: {
        self,
        shopAccountCheck,
        purchasesGroups,
        categories,
        tags,
        productsExpenses
    },
    Mutation: {
        updateShopAccount,
        importPurchasesHistory
    },
    User: {
        id: nodeIdResolver,
        ...userResolvers
    },
    ShopAccount: {
        id: nodeIdResolver
    },
    Product: {
        id: nodeIdResolver,
        ...productResolvers
    },
    Purchase: {
        id: nodeIdResolver
    },
    PurchasesGroup: {
        ...purchasesGroupResolvers
    },
    ProductExpense: {},
    Category: {
        id: nodeIdResolver
    },
    Tag: {
        id: nodeIdResolver
    }
};
