import ShopAccount from '../../entities/ShopAccount';
import {EntityNode, pickSimpleEntityProps} from '../node';

export interface ShopAccountNode extends EntityNode<ShopAccount> { }

export const createShopAccountNode = (account: ShopAccount): ShopAccountNode => {
    return pickSimpleEntityProps(account);
};
