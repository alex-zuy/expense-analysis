import * as moment from 'moment';
import {Repository} from 'typeorm';
import ShopDataProvider from '../dataProviders/ShopDataProvider';
import ShopAccount from '../entities/ShopAccount';
import User from '../entities/User';

export type UpdateAccountFields = Pick<ShopAccount, 'login' | 'accessToken' | 'expiresAt'>;

interface DateRange {
    dateFrom: Date,
    dateTo: Date
}

export default class ShopAccountsService {

    private readonly shopAccountsRepository: Repository<ShopAccount>;

    private readonly currentUser: User;


    constructor(shopAccountsRepository: Repository<ShopAccount>, currentUser: User) {
        this.shopAccountsRepository = shopAccountsRepository;
        this.currentUser = currentUser;
    }

    async createOrUpdateShopAccountFields(fields: UpdateAccountFields): Promise<ShopAccount> {
        const existingAccount = await this.shopAccountsRepository.findOne({
            where: {
                user: this.currentUser
            }
        });

        const account = existingAccount
            ? existingAccount
            : new ShopAccount({user: this.currentUser});

        Object.assign(account, fields);

        return this.shopAccountsRepository.save(account);
    }

    async assertRequestedImportRangeValid(range: DateRange): Promise<void> {
        assertDateRangeValid(range);
        const account = await this.getShopAccountOrFail();
        assertDateRangeExtendsSavedRange(account, range);
    }

    async updateImportedRangeFields(requestedRange: DateRange): Promise<ShopAccount> {
        await this.assertRequestedImportRangeValid(requestedRange);

        const presentTime = moment();

        const dateTo = moment(requestedRange.dateTo).isSame(presentTime, 'days')
            ? presentTime
            : moment(requestedRange.dateTo).endOf('days');

        const account = await this.getShopAccountOrFail();
        account.importedRangeStart = requestedRange.dateFrom;
        account.importedRangeEnd = dateTo.toDate();
        return this.shopAccountsRepository.save(account);
    }

    async getShopDataProvider(): Promise<ShopDataProvider> {
        const account = await this.getShopAccountAndAssertItIsValid();
        return new ShopDataProvider(account.accessToken);
    }

    private async getShopAccountAndAssertItIsValid() {
        const account = await this.getShopAccountOrFail();
        const isValid = moment(account.expiresAt).isAfter(moment());
        if (isValid) {
            return account;
        } else {
            throw new Error('User`s shop account expired');
        }
    }

    private async getShopAccountOrFail() {
        const shopAccount = await this.currentUser.shopAccount;
        if (shopAccount) {
            return shopAccount;
        } else {
            //TODO: introduce business logic error type
            throw new Error('User has no shop account configured');
        }
    }
}

const assertDateRangeExtendsSavedRange = (account: ShopAccount, {dateFrom, dateTo}: DateRange) => {
    const {importedRangeStart, importedRangeEnd} = account;
    if(importedRangeStart && importedRangeEnd) {
        const newRangeExtendsExisting = [importedRangeStart, importedRangeEnd].every(
            (date) => moment(date).isBetween(dateFrom, dateTo, undefined, '[]')
        );
        if(!newRangeExtendsExisting) {
            throw new Error('New range must not shrink existing');
        }
    }
};

const assertDateRangeValid = ({dateFrom, dateTo}: DateRange) => {
    if (!moment(dateFrom).isBefore(dateTo)) {
        throw new Error(`'dateFrom' must be before 'dateTo'`);
    }
    if (!moment(dateTo).isBefore(moment())) {
        throw new Error(`'dateTo' must be in past`);
    }
};
