import { BeforeUpdate, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Token, File } from '.';
import { Posts } from './post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'email',
    unique: true,
    nullable: false,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'name',
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'birth_date',
    nullable: false,
  })
  birthDate: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'address',
    nullable: false,
  })
  address: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'phone_number',
    nullable: false,
  })
  phoneNumber: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'password',
    nullable: false,
  })
  password: string;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({
    name: 'updated_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @BeforeUpdate()
  updateDates() {
    this.updatedAt = new Date();
  }

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Token, (token) => token.user)
  tokens: Token[];

  @OneToMany(() => File, (file) => file.user)
  files: File[];
}
