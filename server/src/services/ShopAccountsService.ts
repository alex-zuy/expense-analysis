import {Repository} from 'typeorm';
import ShopAccount from '../entities/ShopAccount';
import User from '../entities/User';

export type UpdateAccountFields = Pick<ShopAccount, 'login' | 'accessToken' | 'expiresAt'>;

export default class ShopAccountsService {

    private readonly shopAccountsRepository: Repository<ShopAccount>;

    private readonly currentUser: User;


    constructor(shopAccountsRepository: Repository<ShopAccount>, currentUser: User) {
        this.shopAccountsRepository = shopAccountsRepository;
        this.currentUser = currentUser;
    }

    async createOrUpdateShopAccount(id: number | null, fields: UpdateAccountFields): Promise<ShopAccount> {

        const account = id !== null
            ? await this.shopAccountsRepository.findOneOrFail(id)
            : new ShopAccount();

        Object.assign(account, fields);
        account.user = this.currentUser;

        return this.shopAccountsRepository.save(account);
    }
}
