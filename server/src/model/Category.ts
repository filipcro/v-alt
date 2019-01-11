import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Transform, Exclude, Type } from 'class-transformer';

import { User } from './User';
import { Icon } from './Icon';
import { Transaction } from './Transaction';

@Entity({ name: 'categories' })
export class Category {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        length: 50
    })
    name: string;

    @Column()
    incomings: boolean;

    @Column()
    outgoings: boolean;

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

    @ManyToOne(type => Icon)
    @JoinColumn({ name: 'iconId' })
    icon: Icon;

    @Column({ nullable: false })
    @Transform(value => value.toString(), { toPlainOnly: true })
    iconId: number;

    @OneToMany(type => Transaction, transactions => transactions.account)
    transactions: Transaction[];
}
