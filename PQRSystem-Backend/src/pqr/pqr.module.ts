import { Module } from '@nestjs/common';
import { PqrService } from './pqr.service';
import { PqrController } from './pqr.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pqr } from './entities/pqr.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  controllers: [PqrController],
  providers: [PqrService],
  imports: [
    TypeOrmModule.forFeature([ Pqr ]),
    AuthModule
  ],
})
export class PqrModule {}
