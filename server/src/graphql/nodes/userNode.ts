import User from '../../entities/User';
import {EntityNode, pickSimpleEntityProps} from '../node';
import {ResolverFunc} from '../resolver';
import {createShopAccountNode, ShopAccountNode} from './shopAccountNode';

const shopAccount: ResolverFunc<ShopAccountNode | null, UserNode> = async function(args, ctx) {
    const account = await this.entity.shopAccount;
    return account ? createShopAccountNode(account) : null;
}

const resolvers = {
    shopAccount
};

export interface UserNode extends EntityNode<User, typeof resolvers> {
    entity: User
};

export const createUserNode = (user: User): UserNode => {
    return {
        ...pickSimpleEntityProps(user),
        ...resolvers,
        entity: user
    }
};
