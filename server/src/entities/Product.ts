import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn
} from 'typeorm';
import Category from './Category';
import Purchase from './Purchase';
import Tag from './Tag';
import User from './User';

@Entity('products')
@Index(['name', 'user'], {unique: true})
export default class Product {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => User, {lazy: true, nullable: false})
    @JoinColumn({name: 'user_id'})
    user: Promise<User>;

    @OneToMany(type => Purchase, purchase => purchase.product)
    purchases: Purchase[] | undefined;

    @ManyToMany(type => Tag, tag => tag.products, {eager: true})
    @JoinTable({
        name: 'product_tags',
        joinColumn: {name: 'product_id'},
        inverseJoinColumn: {name: 'tag_id'}
    })
    tags: Tag[];

    @ManyToOne(type => Category, category => category.products, {eager: true})
    @JoinColumn({name: 'category_id'})
    category: Category | undefined;

    constructor(props: Partial<Product> = {}) {
        Object.assign(this, props);
    }
}
