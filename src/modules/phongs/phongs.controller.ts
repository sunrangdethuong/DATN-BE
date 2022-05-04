import { Image } from './../../interfaces/image.interface';
import { Observable, of } from 'rxjs';
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
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import path = require('path');
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';

export const storage = {
  storage: diskStorage({
    destination: './images',
    filename: (req, file, cb) => {
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4();
      const extension: string = path.parse(file.originalname).ext;

      cb(null, `${filename}${extension}`);
    },
  }),
};

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

  @Get('/status:id')
  async getPhongByStatus(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<Phong[]> {
    return this.phongService.getPhongByStatus(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/image/upload')
  @UseInterceptors(FileInterceptor('file', storage))
  uploadImage(@UploadedFile() file): Observable<Image> {
    return of(file);
  }

  @Get('image/:image_name')
  findImage(@Param('image_name') imageName, @Res() res): Observable<Object> {
    return of(
      res.sendFile(
        join(process.cwd(), 'images/' + imageName),
      ),
    );
  }
}
