import { JwtAuthGuard } from './../auths/guards/jwt-auth.guard';
import { PhongDto } from './../../dto/phongs/phong.dto';
import { Phong } from './../../entities/phong.entity';
import { PhongsService } from './phongs.service';
import {
  Body,
  Controller,
  Get,
  Patch,
  Post,
  Param,
  ParseIntPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';

@Controller('phongs')
export class PhongsController {
  constructor(private readonly phongService: PhongsService) {}

  @Get()
  async getAll(): Promise<Phong[]> {
    return this.phongService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('/create')
  async create(@Body() dto: PhongDto): Promise<Phong> {
    return this.phongService.createPhong(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: PhongDto,
  ): Promise<Phong> {
    return this.phongService.updatePhong(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.phongService.deletePhong(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status:id')
  async getPhongByStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Phong[]> {
    return this.phongService.getPhongByStatus(id);
  }
}
