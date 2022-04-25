import { Phong } from './../entities/phong.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Phong)
export class PhongRepository extends Repository<Phong> {}
