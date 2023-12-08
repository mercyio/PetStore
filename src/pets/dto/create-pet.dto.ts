import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class createPetsDto{
    @IsNotEmpty()
    @IsString()
    petType: string

    @IsNotEmpty()
    @IsString()
    colour: string

    @IsNotEmpty()
    @IsNumber()
    age: number

}