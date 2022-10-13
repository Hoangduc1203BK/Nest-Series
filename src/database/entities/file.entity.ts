import { BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('files')
export class File {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '200',
    name: 'url',
    nullable: false,
  })
  url: string;

  @Column({
    type: 'varchar',
    length: '200',
    name: 'key',
    nullable: false,
  })
  key: string;

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: false,
  })
  userId: number;

  @OneToMany(()=> User, (user) => user.files)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  user: User;
}
