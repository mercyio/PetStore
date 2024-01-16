import { IsNotEmpty, IsString, MinLength, IsNumber, Length } from "class-validator"

export class ProfileDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    firstname: string

    @IsNotEmpty()
    @MinLength(3)
    lastname: string

    @IsNotEmpty()
    @IsNumber()
    @Length(11)
    phonenumber: string

}