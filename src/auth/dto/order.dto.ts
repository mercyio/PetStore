import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class OrderDto{
    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @ApiProperty({type: String})
    address: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @ApiProperty({type: String})
    paymentMethod: string

    @IsNotEmpty()
    @IsString()
    @MinLength(2)
    @ApiProperty({type: String})
    totalprice: string
}