import {Entity, Column, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'users'})
export default class User {

    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    email: string;

    @Column({name: 'full_name'})
    fullName: string;

    @Column({select: false})
    password: string;
}
