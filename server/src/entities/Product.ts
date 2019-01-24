import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
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

    constructor(props: Partial<Product> = {}) {
        Object.assign(this, props);
    }
}
