import { CreateDonDatPhongDto } from './../../dto/don-dat-phongs/create-don-dat-phong.dto';
import { PhongsService } from './../phongs/phongs.service';
import { DonDatPhongDto } from './../../dto/don-dat-phongs/don-dat-phong.dto';
import { DonDatPhong } from './../../entities/don-dat-phong.entity';
import { PhongRepository } from './../../repositories/phong.repository';
import { DonDatPhongRepository } from './../../repositories/don-dat-phong.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DonDatPhongsService {
  constructor(
    private readonly donDatPhongRepository: DonDatPhongRepository,
    private readonly phongRepository: PhongRepository,
    private readonly phongsService: PhongsService,
  ) {}

  async getAll(): Promise<DonDatPhong[]> {
    return await this.donDatPhongRepository.find({ relations: ['phong'] });
  }

  async createDonDatPhong(dto: CreateDonDatPhongDto): Promise<DonDatPhong> {
    const phong = await this.phongsService.updateStatus(dto.phongId, 1);
    const donDatPhong = await this.donDatPhongRepository.create({
      ...dto,
      phong: phong,
    });
    return await this.donDatPhongRepository.save(donDatPhong);
  }

  async updateDonDatPhong(
    id: number,
    dto: DonDatPhongDto,
  ): Promise<DonDatPhong> {
    const phong = await this.phongRepository.findOne(dto.phongId);
    const newDonDatPhong = await this.donDatPhongRepository.create({
      ...dto,
      phong: phong,
    });
    const olddonDatPhong = await this.donDatPhongRepository.findOne(id);
    const updateDonDatPhong = Object.assign(olddonDatPhong, newDonDatPhong);
    return await this.donDatPhongRepository.save(updateDonDatPhong);
  }

  async deleteDonDatPhong(id: number): Promise<string> {
    await this.donDatPhongRepository.delete(id);
    return 'Delete successfull!';
  }

  async getDonDatPhongBySoCMT(soCMT: number): Promise<DonDatPhong[]> {
    return await this.donDatPhongRepository.find({
      where: { soCMT: soCMT },
      relations: ['phong'],
    });
  }

  async getDonDatPhongByStatus(status: number): Promise<DonDatPhong[]> {
    return await this.donDatPhongRepository.find({
      where: { status: status },
      relations: ['phong'],
    });
  }
}
