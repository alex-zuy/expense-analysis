import {ApplicationServices} from '../appConfig/createServices';
import ShopDataProvider from '../dataProviders/ShopDataProvider';
import {UpdateAccountFields} from '../services/ShopAccountsService';
import {parseNodeId} from './node';
import {createShopAccountNode, ShopAccountNode} from './nodes/shopAccountNode';
import {createUserNode, UserNode} from './nodes/userNode';
import {ResolverFunc} from './resolver';

const self: ResolverFunc<UserNode> = async (args, {services}) => {
    return createUserNode(await services.usersService.getCurrentUser());
};

interface ShopAccountCheckResult {
    isSuccess: boolean,
    error?: string,
    userName?: string
}

const shopAccountCheck: ResolverFunc<ShopAccountCheckResult, undefined, {accessToken: string}> =
    async (args, {services}) => {
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
    }

type UpdateShopAccountInput = UpdateAccountFields & {id: string | null};

const updateShopAccount: ResolverFunc<ShopAccountNode, undefined, {input: UpdateShopAccountInput}> =
    async (args, {services}) => {
        const {id, ...rest} = args.input;
        const realId = id ? parseNodeId(id).id : null;
        const account = await services.shopAccountsService.createOrUpdateShopAccount(realId, rest);
        return createShopAccountNode(account);
    }

export default {
    self,
    shopAccountCheck,
    updateShopAccount
};
