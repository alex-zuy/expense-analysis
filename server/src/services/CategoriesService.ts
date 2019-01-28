import {Repository} from 'typeorm';
import Category from '../entities/Category';
import User from '../entities/User';

export default class CategoriesService {

    constructor(
        private readonly currentUser: User,
        private readonly categoriesRepository: Repository<Category>
    ) {
    }

    async listCategories(): Promise<Category[]> {
        return this.categoriesRepository.find({
            where: {
                user: this.currentUser
            },
            relations: ['parent']
        });
    }
}
