import {Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn} from 'typeorm';
import Product from './Product';
import User from './User';

@Entity('categories')
@Index(['user', 'name'], {unique: true})
export default class Category {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @Column({name: 'parent_id'})
    parentId: number | undefined;

    @ManyToOne(type => Category, category => category.children)
    @JoinColumn({name: 'parent_id'})
    parent: Category | undefined;

    @OneToMany(type => Category, category => category.parent)
    children: Category[] | undefined;

    @ManyToOne(type => User, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User | undefined;

    @OneToMany(type => Product, product => product.category)
    products: number[] | undefined;
}
