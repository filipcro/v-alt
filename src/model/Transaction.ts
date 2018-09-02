import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Account } from './Account';
import { Category } from './Category';
import { Currency } from './Currency';

@Entity({ name: 'transactions' })
export class Transaction {

    @PrimaryGeneratedColumn()
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
    currency: Currency;

    @ManyToOne(
        type => Account,
        account => account.transactions,
        { nullable: false }
    )
    account: Account;

    @ManyToOne(
        type => Category,
        category => category.transactions,
        {
            onDelete: 'SET NULL',
            nullable:true
        }
    )
    category: Category;
}
