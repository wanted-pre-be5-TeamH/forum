import { TypeOrmBaseEntity } from 'src/api/common/model/typeorm-entity.base';
import { Column, CreateDateColumn, Entity } from 'typeorm';
import {
  IsDate,
  IsEnum,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';
import { UserGender, UserRole } from '../domain/user.enum';
import { ExceptionMessage } from 'src/api/common/provider/message.provider';

export const UserErrorMessage = {
  username: '사용지명은 문자열입니다.',
  username_unique: '이미 존재하는 사용자명입니다.',
  password: '잘못된 비밀번호입니다.',
  role: `사용자 권한에 ${ExceptionMessage.WRD}`,
  gender: `성별에 ${ExceptionMessage.WRD}`,
  birth: '네자리 연도를 입력하세요.',
};

@Entity({ name: 'users' })
export class UserEntity extends TypeOrmBaseEntity {
  @Column({ unique: true })
  @IsString({ message: UserErrorMessage.username })
  username: string;

  @Column()
  @IsString()
  @Matches(/^[A-Za-z0-9]{6,12}$/, {
    message: UserErrorMessage.password,
  })
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
  @Min(1900, { message: UserErrorMessage.birth })
  @Max(2999, { message: UserErrorMessage.birth })
  birth_year: number;

  @Column()
  @IsEnum(UserGender, { message: UserErrorMessage.gender })
  gender: UserGender;

  @Column()
  @Matches(/^010-([0-9]{4})-([0-9]{4})$/, {
    message: '전화번호는 010-0000-0000 형식입니다.',
  })
  phone: string;
}
