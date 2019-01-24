import {Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';
import Product from './Product';

@Entity('purchases')
@Index(['product', 'purchasedAt'], {unique: true})
export default class Purchase {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @ManyToOne(type => Product, {eager: true, nullable: false})
    @JoinColumn({name: 'product_id'})
    product: Product;

    @Column('float4')
    amount: number;

    @Column('float4')
    pricePerUnit: number;

    @Column({name: 'purchased_at'})
    purchasedAt: Date;

    constructor(props: Partial<Purchase> = {}) {
        Object.assign(this, props);
    }
}
