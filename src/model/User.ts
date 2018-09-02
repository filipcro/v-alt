import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, OneToMany } from 'typeorm';
import { compare, hash } from 'bcrypt';
import { Exclude, Transform } from 'class-transformer';

import { Account } from './Account';
import { Category } from './Category';

const SALT_ROUNDS = 10;

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        length: 40,
        nullable: true
    })
    name: string;

    @Column({
        length: 60
    })
    @Exclude()
    password: string;

    @Column({
        length: 40,
        unique: true
    })
    username: string;

    @Column({
        unique: true,
        length: 60,
        nullable: true
    })
    email: string;

    @OneToMany(type => Account, account => account.user)
    accounts: Account[];

    @OneToMany(type => Category, category => category.user)
    categories: Category[];

    @BeforeInsert()
    hashPassword() {
        return hash(this.password, SALT_ROUNDS)
            .then((hashed) => {
                this.password = hashed;
                return true;
            });
    }

    comparePasswords(password) {
        return compare(password, this.password);
    }
}
