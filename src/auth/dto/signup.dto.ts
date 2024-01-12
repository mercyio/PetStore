import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "../guard/roles.enum"

export class SignupDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(5)
    userName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    @MinLength(6)
    PhoneNumber: string

    @IsNotEmpty()
    @MinLength(6)
    Password: string 

    @IsOptional()
    role: Role
}