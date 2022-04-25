import { LoaiPhongRepository } from './../../repositories/loai-phong.repository';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoaiPhongsController } from './loai-phongs.controller';
import { LoaiPhongsService } from './loai-phongs.service';

@Module({
  imports: [TypeOrmModule.forFeature([LoaiPhongRepository])],
  controllers: [LoaiPhongsController],
  providers: [LoaiPhongsService],
  exports: [LoaiPhongsService]
})
export class LoaiPhongsModule {}
