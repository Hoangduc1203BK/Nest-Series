import { BeforeUpdate, Column, Entity, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { Categories } from './categories.entity';
import { Posts } from './post.entity';
import { User } from './user.entity';

@Entity('posts_categories')
export class PostCategories {
  @PrimaryGeneratedColumn({
    type: 'int',
    name: 'id',
    unsigned: true,
  })
  id: number;

  @Column({
    type: 'int',
    name: 'post_id',
    nullable: false,
  })
  postId: number;

  @Column({
    type: 'int',
    name: 'categories_id',
    nullable: false,
  })
  categoriesId: string;

  @ManyToOne(() => Categories, (categories) => categories.postCategories)
  @JoinColumn({ name: 'categories_id', referencedColumnName: 'id'})
  categories: Categories;

  @ManyToOne(() => Posts, (post) => post.postCategories)
  @JoinColumn({ name: 'post_id', referencedColumnName: 'id'})
  post: Posts;
}
