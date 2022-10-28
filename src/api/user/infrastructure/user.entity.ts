import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { UserGender, UserRole } from '../domain/user.enum';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';

export const UserErrorMessage = {
  username: '사용지명은 문자열입니다.',
  username_unique: '이미 존재하는 사용자명입니다.',
  password: '잘못된 비밀번호입니다.',
  password_regex: '비밀번호는 숫자와 문자로 이루어진 6~12자리입니다.',
  role: `사용자 권한에 ${ExceptionMessage.WRD}`,
  gender: `성별에 ${ExceptionMessage.WRD}`,
  birth: '네자리 연도를 입력하세요.',
  phone_regex: '전화번호는 010-0000-0000 형식입니다.',
};

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Column()
  @IsString()
  password: string;

  @CreateDateColumn()
  @IsDate()
  @Type(() => Date)
  accessed_at: Date;

  @Column({ default: UserRole.Normal })
  @IsEnum(UserRole, { message: UserErrorMessage.role })
  role: UserRole;

  @Column()
  @IsNumber()
  birth_year: number;

  @Column()
  @IsEnum(UserGender, { message: UserErrorMessage.gender })
  gender: UserGender;

  @Column()
  @IsString()
  phone: string;
}
