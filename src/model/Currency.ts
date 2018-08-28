import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';

@Entity({ name: 'currencies' })
export class Currency {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 5,
        unique: true
    })
    code: string;
}
