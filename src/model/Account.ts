import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './User';
import { Currency } from './Currency';
import { Transaction } from './Transaction';

@Entity({ name: 'accounts' })
export class Account {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @ManyToOne(type => User, user => user.accounts)
    user: User;

    @ManyToOne(type => Currency)
    currency: Currency;

    @OneToMany(type => Transaction, transactions => transactions.account)
    transactions: Transaction[];
}
