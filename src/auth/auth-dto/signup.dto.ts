import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

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
}
