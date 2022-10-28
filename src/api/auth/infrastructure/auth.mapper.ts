import { Injectable } from '@nestjs/common';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { UserEntity } from 'src/api/user/infrastructure/user.entity';
import { Auth } from '../domain/auth.aggregate';
import { IAuth } from '../domain/auth.interface';

@Injectable()
export class AuthMapper implements IEntityMapper<IAuth, UserEntity> {
  toAggregate(entity: UserEntity): IAuth {
    const { id, username, password, accessed_at, created_at, updated_at } =
      entity;
    return Auth.get({
      id,
      username,
      password,
      accessed_at,
      created_at,
      updated_at,
    });
  }
  toRootEntity(aggregate: IAuth): UserEntity {
    const { id, accessed_at } = aggregate;
    const entity = new UserEntity();
    if (id != 0) {
      entity.id = id;
    }
    entity.accessed_at = accessed_at;
    return entity;
  }
}
