import { Column, Entity, OneToOne, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { User } from "./user.entity";
const bcrypt = require('bcrypt');

@Entity()
export class Auth {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    password!: string;

    @Column({ default: false })
    is_password_hashed!: boolean;

    //create before insert function to hash the password with bcrypt
    @BeforeInsert()
    @BeforeUpdate()
    async hashPasswordIfChanged(): Promise<void> {
        // Generate a salt and hash the password
        if (!this.is_password_hashed) {
            const salt = await bcrypt.genSalt();
            this.password = await bcrypt.hash(this.password, salt);
            this.is_password_hashed = true;
        }
    }
}
