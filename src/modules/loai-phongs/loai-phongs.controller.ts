import { LoaiPhongDto } from './../../dto/loai-phongs/loai-phong.dto';
import { LoaiPhong } from './../../entities/loai-phong.entity';
import { JwtAuthGuard } from './../auths/guards/jwt-auth.guard';
import { LoaiPhongsService } from './loai-phongs.service';
import { Controller, Post, UseGuards, Get, Body, Patch, Param, ParseIntPipe, Delete } from '@nestjs/common';
import { plainToClass } from 'class-transformer';

@Controller('loai-phongs')
export class LoaiPhongsController {
  constructor(private readonly loaiPhongService: LoaiPhongsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<LoaiPhong[]> {
    return this.loaiPhongService.getAll();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: LoaiPhongDto): Promise<LoaiPhong> {
    const loaiPhong = plainToClass(LoaiPhong, dto);
    const createLoaiPhong = await this.loaiPhongService.createLoaiPhong(loaiPhong);
    return createLoaiPhong;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  async update(@Param('id', ParseIntPipe) id: number, @Body() dto: LoaiPhongDto) {
    const loaiPhong = await this.loaiPhongService.updateLoaiPhong(id, dto);
    return loaiPhong;
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.loaiPhongService.deleteLoaiPhong(id);
  }
}
