import {Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn} from 'typeorm';
import User from './User';

@Entity({name: 'shop_accounts'})
export default class ShopAccount {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @OneToOne(type => User, (user) => user.shopAccount, {eager: true, nullable: false})
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

    @Column({type: 'timestamp', name: 'imported_range_start', nullable: true})
    importedRangeStart: Date | null;

    @Column({type: 'timestamp', name: 'imported_range_end', nullable: true})
    importedRangeEnd: Date | null;

    constructor(fields: Partial<ShopAccount> = {}) {
        Object.assign(fields);
    }
}
