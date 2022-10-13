import { BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('posts')
export class Posts {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'title',
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'author',
    nullable: false,
  })
  author: string;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'content',
    nullable: false,
  })
  content: string;

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

  @ManyToOne(() => User, (user) => user.posts)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id'})
  user: User;
}
