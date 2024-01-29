import { Column, Entity, Index } from 'typeorm';
import { BaseModel } from './base_model';

@Index('user_pkey', ['id'], { unique: true })
@Entity('user', { schema: 'public' })
export class User extends BaseModel {
  @Column('varchar', { name: 'name', nullable: false, unique: false })
  name: string;
  @Column('varchar', { unique: true })
  email: string;
  @Column()
  password: string;
}
