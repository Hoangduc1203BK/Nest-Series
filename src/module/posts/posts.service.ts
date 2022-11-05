import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categories, Posts, User } from '../../database/entities';
import { getConnection, Repository } from 'typeorm';
import { Cache } from 'cache-manager';
import { CreatePostDto } from './dto';
import { Transaction, EntityManager, TransactionManager } from 'typeorm';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepos: Repository<Posts>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getPost(id: number) {
    // const post = await this.postRepos.findOne({
    //   where: { id },
    //   relations: ['user', 'postCategories', 'postCategories.categories'],
    //   // select: ['postCategories']
    // });

    const connection = getConnection();
    const post = await this.postRepos
    .createQueryBuilder('p')
    .leftJoinAndSelect(User,'u', 'u.id = p.user_id')
    .where('p.id = :id', { id })
    .getOne();

    // const post = await this.postRepos.query(`
    //   select * from posts as p 
    //   inner join users as  u 
    //   on p.user_id = u.id where p.id = ${id}
    // `)

    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  async getPosts(userId: number) {
    const post = await this.postRepos.find({
      where: { userId },
    });

    if (!post) {
      throw new Error('Post not found');
    }
    return post;
  }

  @Transaction()
  async createPost(userId: number, payload: CreatePostDto, @TransactionManager() manager: EntityManager = null) {
    const user = await manager.getRepository(User).findOne({ id: userId });

    if (!user) {
      throw new Error('User not found');
    }

    await Promise.all(
      payload.categoriesIds.map(async (c) => {
        const categories = await manager.getRepository(Categories).findOne({ id: c });

        if (!categories) throw new Error('Categories not found');
      }),
    );

    const doc = {
      ...payload,
      userId,
    };
    const result = await manager.getRepository(Posts).save(doc);

    await Promise.all(
      payload.categoriesIds.map(async (c) => {
        await manager.getRepository('posts_categories').save({
          postId: result.id,
          categoriesId: c,
        });
      }),
    );
    return result;
  }


  @Transaction()
  async transaction1(@TransactionManager() manager: EntityManager = null) {
    const qr = manager.queryRunner
    await qr.startTransaction();
     const result = await manager.getRepository(Posts).query("update posts set title ='abc' where id = 1" )

     let count = 1;
     for(let i = 0; i <1000000000000; i++) {
      count*=Math.pow(i,3)
     }
    await qr.commitTransaction()

  }

  @Transaction({ isolation: 'READ UNCOMMITTED'})
  async transaction2(@TransactionManager() manager: EntityManager = null) {
      const result = await manager.getRepository(Posts).find();

      return result;
  }
}
