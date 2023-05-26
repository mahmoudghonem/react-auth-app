
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Auth } from "./auth.entity";
import { IsEmail, IsString, Length } from "class-validator";
import { defaultAvatar } from "../constants";

@Entity()
export class User  {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    @IsString()
    @Length(3, 25, { message: 'First name must be between 3 and 25 characters' })
    first_name!: string;

    @Column()
    @IsString()
    @Length(3, 25, { message: 'Last name must be between 3 and 25 characters' })
    last_name!: string;

    @Column()
    @IsEmail()
    email!: string;

    @Column({ default: defaultAvatar })
    avatar!: string;

    @OneToOne(() => Auth)
    @JoinColumn()
    auth!: Auth;
}
