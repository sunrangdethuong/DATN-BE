import { LoaiPhongDto } from './../../dto/loai-phongs/loai-phong.dto';
import { LoaiPhong } from './../../entities/loai-phong.entity';
import { LoaiPhongRepository } from './../../repositories/loai-phong.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LoaiPhongsService {
  constructor(private readonly loaiPhongRepository: LoaiPhongRepository) {}

  async getAll(): Promise<LoaiPhong[]> {
    return await this.loaiPhongRepository.find();
  }

  async createLoaiPhong(loaiPhong: LoaiPhong): Promise<LoaiPhong> {
    const createLoaiPhong = await this.loaiPhongRepository.create(loaiPhong);
    return await this.loaiPhongRepository.save(createLoaiPhong);
  }

  async updateLoaiPhong(id: number, dto: LoaiPhongDto): Promise<LoaiPhong> {
    const loaiPhong = await this.loaiPhongRepository.findOne(id);
    const updateLoaiPhong = Object.assign(loaiPhong, dto);
    return await this.loaiPhongRepository.save(updateLoaiPhong);
  }

  async deleteLoaiPhong(id: number): Promise<string> {
    await this.loaiPhongRepository.delete(id);
    return 'Delete successfull!';
  }
}
