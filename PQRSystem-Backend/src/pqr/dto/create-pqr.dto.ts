import { IsDate, IsEmail, IsIn, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class CreatePqrDto {

    @ApiProperty({
        example: 'Product not delivered',
        description: 'Ticket of the PQR',
        required: true
    })
    @IsString()
    @MinLength(3)
    titlePqr: string;

    @ApiProperty({
        example: ['petition', 'complain', 'claim'],
        description: 'Type of the PQR',
        required: true
    })
    @IsString()
    @IsIn(['petition', 'complain', 'claim'])
    typePqr: string;

    /*@ApiProperty({
        example: ['pending', 'in process', 'solved'],
        description: 'Status of the PQR'
    })*/
    @IsString()
    @IsIn(['pending', 'in process', 'solved'])
    @IsOptional()
    status?: string;

    @ApiProperty({
        example: 'I have not received my product',
        description: 'Description of the PQR',
        required: true
    })
    @IsString()
    description: string;
}