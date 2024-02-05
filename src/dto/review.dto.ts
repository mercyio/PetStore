import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class reviewDto{

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    // @ApiProperty({type: String})
    content: string


}