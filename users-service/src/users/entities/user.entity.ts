import { IsDate, IsInt, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;
    @Column()
    username: string;
    @Column()
    @IsString()
    email: string;
    @Column()
    @IsString()
    password: string;
    @Column()
    @IsString()
    firstName: string;
    @Column()
    @IsString()
    lastName: string;
    @Column()
    @IsString()
    phoneNumber: string;
    @Column()
    @IsString()
    adress: string;
    @Column()
    @IsString()
    city: string;
    @Column()
    @IsString()
    state: string;
    @Column()
    @IsString()
    zipCode: string;
    @Column()
    @IsString()
    country: string;
    @Column()
    @IsDate()
    createAt: Date;
    @Column()
    @IsDate()
    updatedAt: Date;
    @Column()
    @IsString()
    role: string;
}