import { IsNotEmpty, IsString, MinLength, Length, IsOptional } from "class-validator"
import { Role } from "../enum/roles.enum"
import { ApiProperty } from "@nestjs/swagger"

export class ProfileDto{
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(2)
    // @ApiProperty({type: String})
    // userName: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @ApiProperty({type: String})
    firstname: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @ApiProperty({type: String})
    lastname: string

    @IsNotEmpty()
    @Length(11)
    @ApiProperty({type: String})
    phonenumber: string

    @IsOptional()
    @ApiProperty({type: String})
    role: Role

}