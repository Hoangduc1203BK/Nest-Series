import { PostCategories } from './posts_categories.entity';
import { BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { User } from './user.entity';

@Entity('categories')
export class Categories {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'varchar',
    length: '50',
    name: 'name',
    nullable: false,
  })
  name: string;

  @OneToMany(() => PostCategories, (postCategories) => postCategories.categories)
  postCategories: PostCategories[];
}
