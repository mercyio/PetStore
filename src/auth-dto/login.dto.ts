import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    Email: string

    @IsNotEmpty()
    @MinLength(6)
    Password: string
}
