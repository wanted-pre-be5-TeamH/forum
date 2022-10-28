import { Public } from 'src/api/auth/infrastructure/decorator/public.decorator';
import { httpExceptionProvider } from 'src/api/common/provider/exception.provider';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import { BoardResponseInterceptor } from '../infrastructure/board.interceptor';
import { BoardService } from '../application/board.service';
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

@UseInterceptors(BoardResponseInterceptor)
@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Public()
  @Get()
  async findMany(): Promise<IBoardResponse[]> {
    const boards = await this.boardService.findMany();
    return boards.map((board) => board.getResponse());
  }

  @Get(':board_id')
  async findOne(
    @AuthUser() auth: IAuthResponse,
    @Param() { board_id: id }: FindOneBoardParam,
  ): Promise<IBoardResponse> {
    const board = await this.boardService.findOne({ id });
    if (board.checkPermission(auth.role, 'read')) {
      return board.getResponse();
    }
    throw httpExceptionProvider('403', ExceptionMessage.FBD);
  }

  @Permission(UserRole.Admin)
  @Post()
  async create(@Body() body: CreateBoardBody): Promise<IBoardResponse> {
    const { title, read_access, write_access, announcement } = body;
    const user = await this.boardService.create({
      title,
      read_access,
      write_access,
      announcement,
    });
    return user.getResponse();
  }

  @Permission(UserRole.Admin)
  @Delete(':board_id')
  async remove(
    @Param() { board_id }: FindOneBoardParam,
  ): Promise<RemoveBoardResponse> {
    await this.boardService.remove({ id: board_id });
    return { id: board_id };
  }
}
