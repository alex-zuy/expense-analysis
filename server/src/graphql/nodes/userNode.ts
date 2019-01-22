import User from '../../entities/User';
import {EntityNode, pickSimpleEntityProps} from '../node';
import {MemberResolverFunc} from '../resolver';
import {createShopAccountNode, ShopAccountNode} from './shopAccountNode';

const shopAccount: MemberResolverFunc<ShopAccountNode | null, UserNode> = async function(ctx, args) {
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
