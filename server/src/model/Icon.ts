import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Transform } from 'class-transformer';

@Entity({ name: 'icons' })
export class Icon {

    @PrimaryGeneratedColumn()
    @Transform(value => value.toString(), { toPlainOnly: true })
    id: number;

    @Column({
        length: 40,
        nullable: true
    })
    name: string;

    @Column({
        type: 'text'
    })
    svg: string;
}
