import {composeNodeId} from '../node';
import {ResolverFunc} from '../resolver';
import {PurchasesGroup} from '../rootResolvers';

export const id: ResolverFunc<string, PurchasesGroup> =
    (source) => composeNodeId('PurchasesGroup', source.purchasedAt.getTime());

export const totalPrice: ResolverFunc<string, PurchasesGroup> = (source) => {
    return source.items.reduce(
        (sum, purchase) => sum + purchase.pricePerUnit * purchase.amount,
        0
    );
};
