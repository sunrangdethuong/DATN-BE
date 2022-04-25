import { LoaiPhong } from './loai-phong.entity';
import { Status } from './../config/status.enum';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DonDatPhong } from './don-dat-phong.entity';

@Entity({
  name: 'phongs',
})
export class Phong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: Status,
    default: Status.CHUA_THUE,
    name: 'status',
  })
  status: Status;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'image',
  })
  image: string;

  @Column({
    type: 'text',
    nullable: false,
    name: 'detail',
  })
  detail: string;

  @ManyToOne(() => LoaiPhong, (loaiPhong) => loaiPhong.phongs, {onDelete: 'SET NULL'})
  loaiPhong: LoaiPhong;

  @OneToMany(() => DonDatPhong, (donDatPhong) => donDatPhong.phong)
  donDatPhongs: DonDatPhong[];
}
