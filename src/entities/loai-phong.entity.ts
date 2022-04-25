import { Phong } from './phong.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'loai_phongs',
})
export class LoaiPhong {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'type',
  })
  type: string;

  @Column({
    type: 'int',
    nullable: false,
    name: 'cost',
  })
  cost: number;

  @OneToMany(() => Phong, (phong) => phong.loaiPhong)
  phongs: Phong[];
}
