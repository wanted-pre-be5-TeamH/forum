import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardCheckPermissionService } from './application/board.checkPermission.service';
import { BoardFindOneService } from './application/board.findOne.service';
import { services } from './application/provider.service';
import { BoardEntity } from './infrastructure/board.entity';
import { BoardEntityMapper } from './infrastructure/board.mapper';
import { BoardRepository } from './infrastructure/board.repository';
import { BoardController } from './presentation/board.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardEntityMapper, BoardRepository, ...services],
  controllers: [BoardController],
  exports: [BoardFindOneService, BoardCheckPermissionService],
})
export class BoardModule {}
