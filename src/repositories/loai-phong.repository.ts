import { LoaiPhong } from './../entities/loai-phong.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(LoaiPhong)
export class LoaiPhongRepository extends Repository<LoaiPhong> {}
