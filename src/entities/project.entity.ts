import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity()
export class Project {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'text' })
    description: string;

    @Column({ type: 'varchar' })
    location: string;
}