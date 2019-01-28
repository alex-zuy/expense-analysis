import Category from '../../entities/Category';
import Product from '../../entities/Product';
import {ResolverFunc} from '../resolver';
import * as lodash from 'lodash';

export const categoryPath: ResolverFunc<Category[], Product> =
    async (source, args, {services}) => {
        if(source.category) {
            const categories = await services.categoriesService.listCategories();
            const byId = lodash.keyBy(categories, 'id');
            const categoriesPath = [];
            for(
                let category: Category | null = source.category;
                category;
                category = category.parentId ? byId[category.parentId] : null
            ) {
                categoriesPath.unshift(category);
            }

            return categoriesPath;
        } else {
            return [];
        }
    };
