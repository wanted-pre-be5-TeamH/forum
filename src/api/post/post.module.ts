import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from '../board/board.module';
import { services } from './application/provider.service';
import { PostEntity } from './infrastructure/post.entity';
import { PostEntityMapper } from './infrastructure/post.mapper';
import { PostRepository } from './infrastructure/post.repository';
import { PostController } from './presentation/post.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PostEntity]), BoardModule],
  providers: [PostEntityMapper, PostRepository, ...services],
  controllers: [PostController],
})
export class PostModule {}
