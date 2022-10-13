import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from './user.entity';

@Entity('tokens')
export class Token {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '500',
    name: 'token',
    nullable: false,
  })
  token: string;

  @Column({
    type: 'varchar',
    name: 'type',
  })
  type: string;

  @Column({
    type: 'timestamp',
    name: 'expires',
    nullable: false,
  })
  expires: Date;

  @Column({
    type: 'boolean',
    name: 'blacklisted',
    default: false,
  })
  blacklisted: boolean;

  @Column({
    type: 'int',
    name: 'user_id',
    nullable: true,
  })
  userId: number;

  @ManyToOne(() => User, (user) => user.tokens)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
