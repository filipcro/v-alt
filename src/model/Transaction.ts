import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Transform } from 'class-transformer';

import { Account } from './Account';
import { Category } from './Category';
import { Currency } from './Currency';

@Entity({ name: 'transactions' })
export class Transaction {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        type: 'text',
        nullable: true
    })
    description: string;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 4
    })
    amount: number;

    @Column()
    dateTime: Date;

    @Column({
        type: 'decimal',
        precision: 10,
        scale: 6
    })
    rate: number;

    @ManyToOne(
        type => Currency,
        { nullable: false }
    )
    @JoinColumn({ name: 'currencyId' })
    currency: Currency;

    @Column({ nullable: false })
    @Transform(value => value.toString(), { toPlainOnly: true })
    currencyId: number;

    @ManyToOne(
        type => Account,
        account => account.transactions,
        { nullable: false }
    )
    @JoinColumn({ name: 'accountId' })
    account: Account;

    @Column({ nullable: false })
    @Transform(value => value.toString(), { toPlainOnly: true })
    accountId: number;

    @ManyToOne(
        type => Category,
        category => category.transactions,
        {
            onDelete: 'SET NULL',
            nullable:true
        }
    )
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @Column({ nullable: true })
    @Transform(value => value ? value.toString() : undefined, { toPlainOnly: true })
    categoryId: number;
}
