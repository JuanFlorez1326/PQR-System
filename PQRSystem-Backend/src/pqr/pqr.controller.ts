import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe } from '@nestjs/common';
import { PqrService } from './pqr.service';
import { CreatePqrDto } from './dto/create-pqr.dto';
import { UpdatePqrDto } from './dto/update-pqr.dto';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { Auth } from 'src/auth/entities/auth.entity';
import { Pqr } from './entities/pqr.entity';
import { AuthDecotaror } from 'src/auth/decorators/auth.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ValidRoles } from 'src/auth/interfaces/valid-roles';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('PQRs')
@Controller('pqr')
export class PqrController {
  constructor(
    private readonly pqrService: PqrService
  ) {}

  @Post()
  @AuthDecotaror()
  create(
    @Body() createPqrDto: CreatePqrDto,
    @GetUser() user: Auth
  ): Promise<Pqr> {
    return this.pqrService.create(createPqrDto, user);
  }

  @Get()
  findAll( 
    @Query() paginationDto:PaginationDto 
  ): Promise<Pqr[]> {
    return this.pqrService.findAll( paginationDto );
  }

  @Get('justpqr/:term')
  findOne(
    @Param('term') term: string
  ): Promise<Pqr> {
    return this.pqrService.findOne( term );
  }

  @Get('detailed/:term')
  detailedPQR(
    @Param('term') term: string
  ): Promise<Pqr> {
    return this.pqrService.detailedPQR( term );
  }

  @Get('my/:userId')
  findMyMessages(
    @Param('userId', ParseUUIDPipe) userId: string
  ): Promise<Pqr[]> {
    return this.pqrService.findMyPqrs( userId );
  }

  @Patch(':id')
  @AuthDecotaror( ValidRoles.admin )
  update(
    @Param('id', ParseUUIDPipe ) id: string, 
    @Body() updatePqrDto: UpdatePqrDto
  ): Promise<Pqr> {
    return this.pqrService.update(id, updatePqrDto);
  }

  @Delete(':id')
  @AuthDecotaror( ValidRoles.admin )
  remove(
    @Param('id', ParseUUIDPipe ) id: string
  ): Promise<Pqr> {
    return this.pqrService.remove( id );
  }
}
