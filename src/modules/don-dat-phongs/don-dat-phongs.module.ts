import { PhongsModule } from './../phongs/phongs.module';
import { PhongRepository } from './../../repositories/phong.repository';
import { DonDatPhongsController } from './don-dat-phongs.controller';
import { DonDatPhongRepository } from './../../repositories/don-dat-phong.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DonDatPhongsService } from './don-dat-phongs.service';

@Module({
  imports: [TypeOrmModule.forFeature([DonDatPhongRepository, PhongRepository]), PhongsModule],
  controllers: [DonDatPhongsController],
  providers: [DonDatPhongsService],
  exports: [DonDatPhongsService],
})
export class DonDatPhongsModule {}
