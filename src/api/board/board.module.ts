import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardService } from './application/board.service';
import { BoardEntity } from './infrastructure/board.entity';
import { BoardEntityMapper } from './infrastructure/board.mapper';
import { BoardRepository } from './infrastructure/board.repository';
import { BoardController } from './presentation/board.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardEntityMapper, BoardRepository, BoardService],
  controllers: [BoardController],
})
export class BoardModule {}
