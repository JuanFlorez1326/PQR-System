import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm/repository/Repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { Auth } from './entities/auth.entity';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { LoginUserDto } from './dto/login-user.dto';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(Auth)
    private readonly userRepository: Repository<Auth>,

    private readonly jwtService: JwtService,
  ) {}

  async register(createUserDto: CreateAuthDto) {
    try {
      const { password, ...userData } = createUserDto;
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync( password, 10 )
      });

      await this.userRepository.save( user )
      delete user.password;

      return {
        ...user,
        token: this.getJwtToken({ idUser: user.idUser })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async login( loginUserDto: LoginUserDto ) {
    const { password, email } = loginUserDto;

    const user = await this.userRepository.findOne({
      where: { email },
      select: { email: true, password: true, idUser: true }
    });

    if ( !user ) 
      throw new UnauthorizedException('Credentials are not valid (email)');
      
    if ( !bcrypt.compareSync( password, user.password ) )
      throw new UnauthorizedException('Credentials are not valid (password)');

    return {
      ...user,
      token: this.getJwtToken({ idUser: user.idUser })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign( payload );
    return token;
  }

  private handleDBErrors(error: any): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
