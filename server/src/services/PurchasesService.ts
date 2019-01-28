import {Repository} from 'typeorm';
import Purchase from '../entities/Purchase';
import User from '../entities/User';
import ProductsService from './ProductsService';
import ShopAccountsService from './ShopAccountsService';

interface DateRange {
    dateFrom: Date,
    dateTo: Date
}

export interface ListPurchasesCriteria extends Partial<DateRange> {
    products?: number[]
}

export default class PurchasesService {

    private readonly currentUser: User;

    private readonly productsService: ProductsService;

    private readonly purchasesRepository: Repository<Purchase>;

    private readonly shopAccountService: ShopAccountsService;

    constructor(currentUser: User, productsService: ProductsService,
                shopAccountService: ShopAccountsService, purchasesRepository: Repository<Purchase>
    ) {
        this.currentUser = currentUser;
        this.productsService = productsService;
        this.shopAccountService = shopAccountService;
        this.purchasesRepository = purchasesRepository;
    }

    async listPurchases(criteria: ListPurchasesCriteria): Promise<Purchase[]> {
        const queryBuilder = this.purchasesRepository.createQueryBuilder('purchase')
            .innerJoinAndSelect('purchase.product', 'product')
            .where('product.user = :userId', {userId: this.currentUser.id});

        if (criteria.dateFrom) {
            queryBuilder.andWhere('purchase.purchasedAt >= :dateFrom', {dateFrom: criteria.dateFrom});
        }

        if (criteria.dateTo) {
            queryBuilder.andWhere('purchase.purchasedAt <= :dateTo', {dateTo:  criteria.dateTo});
        }

        if (criteria.products) {
            queryBuilder.andWhere('product.id IN (:...ids)', {ids: criteria.products});
        }

        return queryBuilder.getMany();
    }

    async importPurchasesFromHistory(requestedRange: DateRange) {
        await this.shopAccountService.assertRequestedImportRangeValid(requestedRange);

        const dataProvider = await this.shopAccountService.getShopDataProvider();

        const historyItems = await dataProvider.listPurchaseHistoryItems(requestedRange);
        for (const item of historyItems) {
            const product = await this.productsService.findOrCreateWithName(item.productName);

            const existingPurchase = await this.purchasesRepository.findOne({
                product,
                purchasedAt: item.purchasedAt
            });

            if (existingPurchase === undefined) {
                const purchase = new Purchase({
                    product,
                    amount: item.amount,
                    pricePerUnit: item.pricePerUnit,
                    purchasedAt: item.purchasedAt
                });
                await this.purchasesRepository.save(purchase);
            }
        }

        return this.shopAccountService.updateImportedRangeFields(requestedRange);
    }
}
