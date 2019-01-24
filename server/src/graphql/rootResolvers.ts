import {GraphQLDate, GraphQLDateTime} from 'graphql-iso-date';
import * as _ from 'lodash';
import {Omit} from 'utility-types';
import ShopDataProvider from '../dataProviders/ShopDataProvider';
import Purchase from '../entities/Purchase';
import ShopAccount from '../entities/ShopAccount';
import User from '../entities/User';
import {UpdateAccountFields} from '../services/ShopAccountsService';
import DateRange from './DateRange';
import {nodeIdResolver, parseNodeId} from './node';
import {ResolverFunc} from './resolver';
import * as purchasesGroupResolvers from './resolvers/purchasesGroup';
import * as userResolvers from './resolvers/user';

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
        purchasesGroups
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
        id: nodeIdResolver
    },
    Purchase: {
        id: nodeIdResolver
    },
    PurchasesGroup: {
        ...purchasesGroupResolvers
    }
};
