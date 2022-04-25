import { LoaiPhongRepository } from './../../repositories/loai-phong.repository';
import { PhongsService } from './phongs.service';
import { PhongsController } from './phongs.controller';
import { PhongRepository } from './../../repositories/phong.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([PhongRepository, LoaiPhongRepository])],
  controllers: [PhongsController],
  providers: [PhongsService],
  exports: [PhongsService],
})
export class PhongsModule {}
