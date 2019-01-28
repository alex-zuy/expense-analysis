import {Column, Entity, Index, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Product from './Product';
import User from './User';

@Entity('tags')
@Index(['user', 'name'], {unique: true})
export default class Tag {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    name: string;

    @Column()
    color: string;

    @ManyToOne(type => User, {nullable: false})
    @JoinColumn({name: 'user_id'})
    user: User | undefined;

    @ManyToMany(type => Product, product => product.tags)
    products: Product[] | undefined;
}
