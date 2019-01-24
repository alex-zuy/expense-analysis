import ShopAccount from '../../entities/ShopAccount';
import User from '../../entities/User';
import {ResolverFunc} from '../resolver';

export const shopAccount: ResolverFunc<ShopAccount | null, User> = async (user, args, ctx) => {
    return await user.shopAccount;
}
