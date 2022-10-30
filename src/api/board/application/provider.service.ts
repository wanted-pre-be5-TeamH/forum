import { BoardCheckDuplicateService } from './board.checkDuplicate.service';
import { BoardCheckPermissionService } from './board.checkPermission.service';
import { BoardCreateUsecase } from './board.create.usecase';
import { BoardFindManyUsecase } from './board.findMany.usecase';
import { BoardFindOneService } from './board.findOne.service';
import { BoardFindOneUsecase } from './board.findOne.usecase';
import { BoardRemoveUsecase } from './board.remove.usecase';
import { BoardUpdateUsecase } from './board.update.usecase';

export const services = [
  BoardCheckDuplicateService,
  BoardCheckPermissionService,
  BoardFindOneService,
  BoardFindOneUsecase,
  BoardFindManyUsecase,
  BoardCreateUsecase,
  BoardUpdateUsecase,
  BoardRemoveUsecase,
];
