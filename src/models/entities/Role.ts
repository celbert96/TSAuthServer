import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from "typeorm";
import { User } from "./User";

@Entity()
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    roleName: string;

    @Column({ length: 1024 })
    description: string;

    @ManyToMany(() => User, user => user.roles)
    users: User[];
}
