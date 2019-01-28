import {Repository} from 'typeorm';
import {SetIntersection} from 'utility-types';
import Product from '../entities/Product';
import User from '../entities/User';

export interface ProductsCriteria {
    loadRelationships?: Array<SetIntersection<keyof Product, 'purchases'>>
}

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

    async listProducts(criteria: ProductsCriteria = {}): Promise<Product[]> {
        return this.productRepository.find({
            where: {
                user: this.currentUser
            },
            relations: criteria.loadRelationships
        });
    }
}
