import { LoaiPhongRepository } from './../../repositories/loai-phong.repository';
import { PhongDto } from './../../dto/phongs/phong.dto';
import { Phong } from './../../entities/phong.entity';
import { PhongRepository } from './../../repositories/phong.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PhongsService {
  constructor(
    private readonly phongRepository: PhongRepository,
    private readonly loaiPhongRepository: LoaiPhongRepository,
  ) {}

  async getAll(): Promise<Phong[]> {
    return await this.phongRepository.find({ relations: ['loaiPhong'] });
  }

  async createPhong(dto: PhongDto): Promise<Phong> {
    const loaiPhong = await this.loaiPhongRepository.findOne(dto.loaiPhongId);
    const phong = await this.phongRepository.create({
      ...dto,
      loaiPhong: loaiPhong,
    });
    return await this.phongRepository.save(phong);
  }

  async updatePhong(id: number, dto: PhongDto): Promise<Phong> {
    const loaiPhong = await this.loaiPhongRepository.findOne(dto.loaiPhongId);
    const newPhong = await this.phongRepository.create({
      ...dto,
      loaiPhong: loaiPhong,
    });
    const oldPhong = await this.phongRepository.findOne(id);
    const updatePhong = Object.assign(oldPhong, newPhong);
    return await this.phongRepository.save(updatePhong);
  }

  async deletePhong(id: number): Promise<string> {
    await this.phongRepository.delete(id);
    return 'Delete successfull!';
  }

  async getPhongByStatus(status: number): Promise<Phong[]> {
    return await this.phongRepository.find({ where: { status: status }, relations: ['loaiPhong'] });
  }

  async updateStatus(id: number, status: number): Promise<Phong> {
    const newPhong = await this.phongRepository.findOne(id);
    newPhong.status = status;
    const oldPhong = await this.phongRepository.findOne(id);
    const updatePhong = Object.assign(oldPhong, newPhong);
    return await this.phongRepository.save(updatePhong);
  }
}
