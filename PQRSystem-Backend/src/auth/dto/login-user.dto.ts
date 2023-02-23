import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Matches, MaxLength, MinLength } from 'class-validator';


export class LoginUserDto {

    @ApiProperty({
        required: true,
        description: 'Enter Your Email, must be a valid email',
        nullable: false
    })
    @IsString()
    @IsEmail()
    email: string;

    @ApiProperty({
        required: true,
        description: 'Enter Your Password, must have a Uppercase, lowercase letter and a number',
        nullable: false,
        minLength: 6,
        maxLength: 50
    })
    @IsString()
    @MinLength(6)
    @MaxLength(50)
    @Matches(
        /(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'The password must have a Uppercase, lowercase letter and a number'
    })
    password: string;
}