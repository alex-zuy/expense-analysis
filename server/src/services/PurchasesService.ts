import {Repository} from 'typeorm';
import Purchase from '../entities/Purchase';
import User from '../entities/User';
import ProductsService from './ProductsService';
import ShopAccountsService from './ShopAccountsService';

interface DateRange {
    dateFrom: Date,
    dateTo: Date
}

export interface ListPurchasesCriteria extends DateRange { }

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
            .where('product.user = :userId', {userId: this.currentUser.id})
            .andWhere('purchase.purchasedAt >= :dateFrom', {dateFrom: criteria.dateFrom})
            .andWhere('purchase.purchasedAt <= :dateTo', {dateTo:  criteria.dateTo});

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
