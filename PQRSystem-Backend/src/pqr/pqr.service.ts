import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Repository } from 'typeorm';
import { validate as isUUID } from 'uuid';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { Pqr } from './entities/pqr.entity';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PqrService {

  constructor(
    @InjectRepository(Pqr)
    private pqrRepository: Repository<Pqr>,

    @InjectRepository(Auth)
    private userRepository: Repository<Auth>
  ) {}

  async create(createPqrDto: CreatePqrDto, user: Auth): Promise<Pqr> {
    try {
      const pqr = this.pqrRepository.create({ ...createPqrDto, user });
      await this.pqrRepository.save(pqr);
      return pqr;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async findAll( paginationDto: PaginationDto ) {
    try {
      const { limit = 10, offset = 0 } = paginationDto;
      const pqr = await this.pqrRepository.find({
        take: limit,
        skip: offset
      });
      return pqr;      
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  //Trae solo los PQRs
  async findOne(term: string) {
    let pqr: Pqr;
    if ( isUUID(term)) {    
      pqr = await this.pqrRepository.findOneBy({ idTicket: term })
    } else {
      const queryBuilder = this.pqrRepository.createQueryBuilder('pqr');
      pqr = await queryBuilder
        .where('LOWER(pqr.titlePqr) =:titlePqr', { titlePqr: term.toLowerCase() })
        .getOne();
    }
    if ( !pqr ) 
      throw new NotFoundException(`Product with ${ term } not found`);
    return pqr;
  }

  //Trae los PQRs con el usuario
  async detailedPQR(term: string) {
    try {
      let pqr: Pqr;
      if ( isUUID(term)) {
        pqr = await this.pqrRepository.findOneBy({ idTicket: term })   
      } else {
        pqr = await this.pqrRepository.findOneBy({ titlePqr: term.toLowerCase() })
      }
      return pqr;
      
    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async findMyPqrs( userId: string ) {
    try {
      const pqrs = await this.pqrRepository.find({ 
        where: { user: { idUser: userId } } 
      });
      return pqrs;
    } catch (error) {
      this.handleDBErrors(error)
    } 
  }

  async update(id: string, updatePqrDto: UpdatePqrDto) {
    try {
      const message = await this.pqrRepository.preload({ idTicket: id, ...updatePqrDto })

      if (!message) 
        throw new NotFoundException(`Message Not Found`);

      const updatedMessage = await this.pqrRepository.save(message);
      return updatedMessage;

    } catch (error) {
      this.handleDBErrors(error)
    }
  }

  async remove(id: string) {
    try {
      const pqr = await this.findOne( id );
      const deletedPqr = await this.pqrRepository.remove( pqr );
      return deletedPqr;
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if ( error.code === '23505' ) 
      throw new BadRequestException( error.detail );

    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }
}
