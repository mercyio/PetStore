import { IsNotEmpty, IsString, MinLength, Length, IsOptional } from "class-validator"
import { Role } from "../auth/enum/roles.enum"
import { ApiProperty } from "@nestjs/swagger"

export class UserDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @ApiProperty({type: String})
    firstname: string

    
}