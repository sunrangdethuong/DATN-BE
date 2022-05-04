import { Phong } from './phong.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'don_dat_phongs',
})
export class DonDatPhong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'ten_khach_hang',
  })
  tenKhachHang: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'so_cmt',
  })
  soCMT: number;

  @Column({
    type: 'varchar',
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @Column({
    type: 'date',
    nullable: false,
    name: 'check_in',
  })
  checkIn: Date;

  @Column({
    type: 'date',
    nullable: false,
    name: 'check_out',
  })
  checkOut: Date;

  @Column({
    type: 'int',
    nullable: false,
    name: 'cost',
  })
  cost: number;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 0,
    name: 'status',
  })
  status: number;

  @Column({
    nullable: true,
    type: 'text',
    name: 'note',
  })
  note: string;

  @ManyToOne(() => Phong, (phong) => phong.donDatPhongs, { onDelete: 'SET NULL'})
  phong: Phong;
}
