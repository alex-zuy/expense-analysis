import {Column, Entity, OneToOne, PrimaryGeneratedColumn} from 'typeorm';
import ShopAccount from './ShopAccount';

@Entity({name: 'users'})
export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column({unique: true})
    email: string;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({select: false})
    password: string;

    @OneToOne(type => ShopAccount, (shopAccount) => shopAccount.user, {
        lazy: true,
        nullable: true
    })
    shopAccount: Promise<ShopAccount | undefined>;
}
