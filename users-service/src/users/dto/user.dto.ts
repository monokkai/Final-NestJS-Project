import { IsInt, IsString, IsDate, Min } from "class-validator"

export class UserDto {
        @IsInt()
        id: number;
        @IsString()
        username: string;
        @IsString()
        email: string;
        @IsString()
        @Min(5)
        password: string;
        @IsString()
        firstName: string;
        @IsString()
        lastName: string;
        @IsString()
        phoneNumber: string;
        @IsString()
        adress: string;
        @IsString()
        city: string;
        @IsString()
        state: string;
        @IsString()
        zipCode: string;
        @IsString()
        country: string;
        @IsDate()
        createAt: Date;
        @IsDate()
        updatedAt: Date;
        @IsString()
        role: string;
}