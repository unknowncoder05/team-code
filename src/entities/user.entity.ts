import {
    PrimaryGeneratedColumn,
    Column,
    Entity,
    CreateDateColumn,
    UpdateDateColumn,
    OneToMany
} from 'typeorm';
import { Project } from './project.entity'


export enum Role {
    ADMIN = "admin",
    DEFAULT = "default"
}
@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 50, unique: true })
    username: string;

    @Column({ type: 'varchar', length: 50, unique: true })
    email: string;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.DEFAULT
    })
    role: Role;

    @OneToMany(() => Project, photo => photo.owner, { nullable: true })
    projects: Project

    @Column({ type: 'varchar', length: 100 })
    password: string









    @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    creationDate: string;

    @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    upadatenDate: string;
}