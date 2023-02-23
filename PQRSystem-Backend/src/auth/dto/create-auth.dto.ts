import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsIn, IsNumber, IsString, Matches, MaxLength, Min, MinLength } from "class-validator";

export class CreateAuthDto {

    @IsNumber()
    @Min(8)
    @ApiProperty({
        example: 1000000000,
        description: 'Enter your ID number, must be a number and have 10 digits',
        required: true
    })
    idNumber: number;
    
    @IsString()
    @IsIn(['CC', 'TI', 'CE'])
    @ApiProperty({
        example: ['CC', 'TI', 'CE'],
        description: 'Enter your ID type, must be CC, TI or CE',
        required: true
    })
    idType: string;

    @IsString()
    @ApiProperty({
        example: 'Juan Carlos',
        description: 'Enter your name, must be a string',
        required: true
    })
    names: string;

    @IsString()
    @ApiProperty({
        example: 'Gonzalez Castaño',
        description: 'Enter your lastname, must be a string',
        required: true
    })
    lastname: string;

    @IsString()
    @MinLength(12)
    @ApiProperty({
        example: '57 300 000 0000',
        description: 'Enter your mobile phone, must be a string and have 12 digits',
        required: true
    })
    mobilePhone: string;

    @IsString()
    @MinLength(10)
    @ApiProperty({
        example: '000 000 0000',
        description: 'Enter your landline, must be a string and have 10 digits',
        required: true
    })
    landline: string;
    
    @IsEmail()
    @IsString()
    @ApiProperty({
        example: 'example@gmail.com',
        description: 'Enter your email, must be a string and have a valid email format',
        required: true
    })
    email: string;

    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @ApiProperty({
        example: 'JuanCarlos300',
        description: 'Enter your password, must be a string and have a Uppercase, lowercase letter and a number',
        required: true
    })
    @Matches( /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}
