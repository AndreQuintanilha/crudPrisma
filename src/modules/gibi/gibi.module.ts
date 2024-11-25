import { Module } from '@nestjs/common';
import { GibiService } from './gibi.service';
import { GibiController } from './gibi.controller';
import { PrismaService } from '../../database/PrismaService';

@Module({
  controllers: [GibiController],
  providers: [GibiService, PrismaService],
})
export class GibiModule {}
