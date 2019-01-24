import Purchase from '../../entities/Purchase';
import {ResolverFunc} from '../resolver';
import {PurchasesGroup} from '../rootResolvers';

export const id: ResolverFunc<string, PurchasesGroup> = (source) => {
    return `PurchasesGroup__${source.purchasedAt.getTime()}`;
};

export const totalPrice: ResolverFunc<string, PurchasesGroup> = (source) => {
    return source.items.reduce(
        (sum, purchase) => sum + purchase.pricePerUnit * purchase.amount,
        0
    );
};
