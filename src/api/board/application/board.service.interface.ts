import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { IService } from 'src/api/common/interface/service.interface';
import { IBoard, IBoardId, IBoardResponse } from '../domain/board.interface';
import {
  CreateBoardDTO,
  FindOneBoardDTO,
  RemoveBoardDTO,
  UpdateBoardDTO,
} from './board.service.dto';

export type IBoardUsecase<Parameters extends unknown[], Response> = IService<
  Parameters,
  Promise<Response>
>;

export type IBoardUsecaseWithAuth<
  Parameters extends unknown[],
  Response,
> = IBoardUsecase<[IAuthResponse, ...Parameters], Response>;

export type IBoardCheckDuplicateService = IBoardUsecase<[string], void>;

export type IBoardCheckPermissionService = IService<
  [IAuthResponse, IBoardResponse, 'read' | 'write'],
  void
>;

export type IBoardCreateUsecase = IBoardUsecase<[CreateBoardDTO], IBoard>;

export type IBoardFindManyUsecase = IBoardUsecase<[], IBoard[]>;

export type IBoardFindOneService = IBoardUsecase<[FindOneBoardDTO], IBoard>;

export type IBoardFindOneUsecase = IBoardUsecaseWithAuth<
  [FindOneBoardDTO],
  IBoard
>;

export type IBoardRemoveUsecase = IBoardUsecase<[RemoveBoardDTO], void>;

export type IBoardUpdateUsecase = IBoardUsecase<
  [IBoardId, UpdateBoardDTO],
  IBoard
>;
