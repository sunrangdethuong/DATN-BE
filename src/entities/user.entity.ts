import { Role } from './../config/role.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'user_name',
  })
  userName: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'password',
  })
  password: string;

  @Column({
    type: 'varchar',
    length: 255,
    nullable: false,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 12,
    nullable: false,
    name: 'phone',
  })
  phone: string;

  @Column({
    type: 'enum',
    enum: Role,
    name: 'role',
    default: Role.USER,
  })
  role: Role;

  @Column({
    type: 'tinyint',
    nullable: false,
    default: 1,
    name: 'status',
  })
  status: boolean;
}
