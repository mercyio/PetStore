import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"
import { Role } from "../auth/enum/roles.enum"
import { ApiProperty } from "@nestjs/swagger"

export class SignupDto {
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(2)
    // @ApiProperty({type: String})
    // userName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    @ApiProperty({type: String})
    Email: string

    @IsNotEmpty()
    @MinLength(5)
    @ApiProperty({type: String})
    Password: string 

    // @IsOptional()
    // role: Role
}

