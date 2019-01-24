import {Repository} from 'typeorm';
import Product from '../entities/Product';
import User from '../entities/User';

export default class ProductsService {

    private readonly currentUser: User;

    private readonly productRepository: Repository<Product>;

    constructor(currentUser: User, productRepository: Repository<Product>) {
        this.currentUser = currentUser;
        this.productRepository = productRepository;
    }

    async findOrCreateWithName(name: string): Promise<Product> {
        const existing = await this.productRepository.findOne({
            where: {
                user: this.currentUser,
                name
            }
        });
        if(existing) {
            return existing;
        } else {
            const product = new Product({
                user: Promise.resolve(this.currentUser),
                name: name
            });
            return this.productRepository.save(product);
        }
    }
}
