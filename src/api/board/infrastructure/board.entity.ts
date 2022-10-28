import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, Entity } from 'typeorm';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/api/user/domain/user.enum';

export const BoardErrorMessage = {
  title: '잘못된 게시판 제목입니다.',
  title_unique: '이미 존재하는 게시판 제목입니다.',
  announcement: '잘못된 공지 설정입니다.',
  read_access: '잘못된 읽기 권한 설정입니다.',
  write_access: '잘못된 수정 권한 설정입니다.',
};

@Entity({ name: 'boards' })
export class BoardEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  @IsString({ message: BoardErrorMessage.title })
  title: string;

  @Column({ default: false })
  @IsBoolean()
  announcement: boolean;

  @Column({ default: UserRole.Admin })
  @IsEnum(UserRole)
  read_access: UserRole;

  @Column({ default: UserRole.Admin })
  @IsEnum(UserRole)
  write_access: UserRole;
}
