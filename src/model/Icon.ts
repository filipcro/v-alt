import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'icons' })
export class Icon {

    @PrimaryGeneratedColumn()
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
