import { IsEmail, IsNotEmpty, IsString, minLength } from "class-validator";

export class CreateUserDto{

    @IsEmail()
    @IsNotEmpty()
    email: string;
    @IsString()
    @IsNotEmpty()
    name: string;
    @IsNotEmpty()
    @IsString()
    password: string;
}