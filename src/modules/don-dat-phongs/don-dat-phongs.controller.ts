import { CreateDonDatPhongDto } from './../../dto/don-dat-phongs/create-don-dat-phong.dto';
import { DonDatPhongDto } from './../../dto/don-dat-phongs/don-dat-phong.dto';
import { DonDatPhong } from './../../entities/don-dat-phong.entity';
import { JwtAuthGuard } from './../auths/guards/jwt-auth.guard';
import { DonDatPhongsService } from './don-dat-phongs.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';

@Controller('don-dat-phongs')
export class DonDatPhongsController {
  constructor(private readonly donDatPhongsService: DonDatPhongsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll(): Promise<DonDatPhong[]> {
    return this.donDatPhongsService.getAll();
  }

  @Post('/create')
  async create(@Body() dto: CreateDonDatPhongDto): Promise<DonDatPhong> {
    return this.donDatPhongsService.createDonDatPhong(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id/update')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: DonDatPhongDto,
  ): Promise<DonDatPhong> {
    return this.donDatPhongsService.updateDonDatPhong(id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<string> {
    return this.donDatPhongsService.deleteDonDatPhong(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/so-cmt/:id')
  async getDonDatPhongBySoCMT(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DonDatPhong[]> {
    return this.donDatPhongsService.getDonDatPhongBySoCMT(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/status/:id')
  async getDonDatPhongByStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<DonDatPhong[]> {
    return this.donDatPhongsService.getDonDatPhongByStatus(id);
  }
}
