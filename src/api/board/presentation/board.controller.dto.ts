import { Type } from 'class-transformer';
import { IsBoolean, IsEnum, IsNumber, IsString } from 'class-validator';
import { UserRole } from 'src/api/user/domain/user.enum';
import { IBoardId, IBoardProperty } from '../domain/board.interface';
import { BoardErrorMessage } from '../infrastructure/board.entity';

export class FindOneBoardParam {
  @IsNumber()
  @Type(() => Number)
  board_id: number;
}

type ICreateBoardBody = Pick<
  IBoardProperty,
  'title' | 'read_access' | 'write_access' | 'announcement'
>;

export class CreateBoardBody implements ICreateBoardBody {
  @IsString()
  title: string;

  @IsEnum(UserRole, { message: BoardErrorMessage.read_access })
  read_access: UserRole;

  @IsEnum(UserRole, { message: BoardErrorMessage.write_access })
  write_access: UserRole;

  @IsBoolean({ message: BoardErrorMessage.announcement })
  @Type(() => Boolean)
  announcement: boolean;
}

export type RemoveBoardResponse = {
  id: IBoardId;
};
