import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "../enum/roles.enum"

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
    Password: string 

    @IsOptional()
    role: Role
}

