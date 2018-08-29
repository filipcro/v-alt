import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Icon } from './Icon';
import { Transaction } from './Transaction';

@Entity({ name: 'category' })
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column()
    incomings: boolean;

    @Column()
    outgoings: boolean;

    @ManyToOne(type => User, user => user.accounts)
    user: User;

    @ManyToOne(type => Icon)
    icon: Icon;

    @OneToMany(type => Transaction, transactions => transactions.account)
    transactions: Transaction[];
}
