import { DonDatPhong } from './../entities/don-dat-phong.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(DonDatPhong)
export class DonDatPhongRepository extends Repository<DonDatPhong> {}
