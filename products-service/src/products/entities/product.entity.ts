import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IsDate, IsInt, IsString} from "class-validator"

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    @IsInt()
    id: number;
    @Column()
    @IsString()
    name: string;
    @Column()
    @IsString()
    description: string;
    @Column()
    @IsString()
    price: string;
    @Column()
    @IsInt()
    stockQuantity: number;
    @Column()
    @IsString()
    category: string;
    @Column()
    @IsString()
    imageUrl: string;
    @Column()
    @IsDate()
    createAt: Date;
    @Column()
    @IsDate()
    updatedAt: Date;    
}