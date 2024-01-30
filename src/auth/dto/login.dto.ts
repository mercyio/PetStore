import { ApiProperty } from "@nestjs/swagger"
import { IsDate, IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({type: String})
    Email: string

    @IsNotEmpty()
    @MinLength(6)
    @ApiProperty({type: String})
    Password: string
}
