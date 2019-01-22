import {ApplicationServices} from '../appConfig/createServices';
import {UpdateAccountFields} from '../services/ShopAccountsService';
import {parseNodeId} from './node';
import {createShopAccountNode, ShopAccountNode} from './nodes/shopAccountNode';
import {createUserNode, UserNode} from './nodes/userNode';
import {ResolverFunc} from './resolver';

const self: ResolverFunc<UserNode> = async (obj, {services}, args) => {
    return createUserNode(await services.usersService.getCurrentUser());
};

type UpdateShopAccountInput = UpdateAccountFields & {id: string | null};

const updateShopAccount: ResolverFunc<ShopAccountNode, undefined, {variableValues: {input: UpdateShopAccountInput}}> =
    async (obj, {services}, args) => {
        const {id, ...rest} = args.variableValues.input;
        const realId = id ? parseNodeId(id).id : null;
        const account = await services.shopAccountsService.createOrUpdateShopAccount(realId, rest);
        return createShopAccountNode(account);
    }

export default {
    self,
    updateShopAccount
};
