import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Transform, Exclude } from 'class-transformer';

import { User } from './User';
import { Currency } from './Currency';
import { Transaction } from './Transaction';

@Entity({ name: 'accounts' })
export class Account {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @ManyToOne(
        type => User,
        user => user.accounts,
        { nullable: false }
    )
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false })
    @Exclude()
    userId: number;

    @ManyToOne(type => Currency, { nullable: false })
    @JoinColumn({ name: 'currencyId' })
    currency: Currency;

    @Column({ nullable: false })
    @Transform(value => value.toString(), { toPlainOnly: true })
    currencyId: number;

    @OneToMany(type => Transaction, transactions => transactions.account)
    transactions: Transaction[];
}
