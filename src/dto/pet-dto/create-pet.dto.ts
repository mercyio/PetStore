import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";

export class createPetsDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    // @IsEnum(['dog, cat, horse, monkey, rabbit, fish'], {message: 'PetType not available'})
    petType: string

    @IsNotEmpty()
    @IsString()
    colour: string

    @IsNotEmpty()
    @IsString()
    age: string

    @IsNotEmpty()
    @IsString()
    breed: string

    // @IsNotEmpty()
    // @MinLength(5)
    // @ApiProperty({type: String})
    // userName: string

}