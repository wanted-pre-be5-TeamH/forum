import { Public } from 'src/api/auth/infrastructure/decorator/public.decorator';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BoardResponseInterceptor } from '../infrastructure/board.interceptor';
import { IBoardResponse } from '../domain/board.interface';
import {
  CreateBoardBody,
  FindOneBoardParam,
  RemoveBoardResponse,
} from './board.controller.dto';
import { AuthUser } from 'src/api/auth/infrastructure/decorator/auth.decorator';
import { IAuthResponse } from 'src/api/auth/domain/auth.interface';
import { Permission } from 'src/api/auth/infrastructure/decorator/permission.decorator';
import { UserRole } from 'src/api/user/domain/user.enum';
import { BoardFindManyUsecase } from '../application/board.findMany.usecase';
import {
  IBoardCreateUsecase,
  IBoardFindManyUsecase,
  IBoardFindOneUsecase,
  IBoardRemoveUsecase,
} from '../application/board.service.interface';
import { BoardFindOneUsecase } from '../application/board.findOne.usecase';
import { BoardCreateUsecase } from '../application/board.create.usecase';
import { BoardRemoveUsecase } from '../application/board.remove.usecase';

@UseInterceptors(BoardResponseInterceptor)
@Controller('board')
export class BoardController {
  constructor(
    @Inject(BoardCreateUsecase)
    private readonly createUsecase: IBoardCreateUsecase,
    @Inject(BoardRemoveUsecase)
    private readonly removeUsecase: IBoardRemoveUsecase,
    @Inject(BoardFindManyUsecase)
    private readonly findManyUsecase: IBoardFindManyUsecase,
    @Inject(BoardFindOneUsecase)
    private readonly findOneUsecase: IBoardFindOneUsecase,
  ) {}

  @Public()
  @Get()
  async findMany(): Promise<IBoardResponse[]> {
    const boards = await this.findManyUsecase.execute();
    return boards.map((board) => board.getResponse());
  }

  @Get(':board_id')
  async findOne(
    @AuthUser() auth: IAuthResponse,
    @Param() { board_id: id }: FindOneBoardParam,
  ): Promise<IBoardResponse> {
    const board = await this.findOneUsecase.execute(auth, { id });
    return board.getResponse();
  }

  @Permission(UserRole.Admin)
  @Post()
  async create(@Body() body: CreateBoardBody): Promise<IBoardResponse> {
    const { title, read_access, write_access, announcement } = body;
    const board = await this.createUsecase.execute({
      title,
      read_access,
      write_access,
      announcement,
    });
    return board.getResponse();
  }

  @Permission(UserRole.Admin)
  @Delete(':board_id')
  async remove(
    @Param() { board_id: id }: FindOneBoardParam,
  ): Promise<RemoveBoardResponse> {
    await this.removeUsecase.execute({ id });
    return { id };
  }
}
