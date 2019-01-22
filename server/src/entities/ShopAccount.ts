import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import User from './User';

@Entity({name: 'shop_accounts'})
export default class ShopAccount {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => User, (user) => user.shopAccount, {
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT',
        eager: true
    })
    @JoinColumn({name: 'user_id'})
    user: User;

    @Column({unique: true})
    login: string;

    @Column({name: 'access_token'})
    accessToken: string;

    @Column({name: 'expires_at'})
    expiresAt: Date;

    @UpdateDateColumn({name: 'updated_at'})
    updatedAt: Date;
}
