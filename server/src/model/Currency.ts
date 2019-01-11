import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ name: 'currencies' })
export class Currency {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        length: 5,
        unique: true
    })
    code: string;
}
