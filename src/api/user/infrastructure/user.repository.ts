import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { TypeOrmBaseRepository } from 'src/api/common/provider/repository.base';
import { FindOneOptions, Repository } from 'typeorm';
import { IUser } from '../domain/user.interface';
import { IUserRepository } from '../domain/repository.interface';
import { UserEntity } from './user.entity';
import { UserEntityMapper } from './user.mapper';

@Injectable()
export class UserRepository
  extends TypeOrmBaseRepository<IUser, UserEntity>
  implements IUserRepository
{
  constructor(
    @Inject(UserEntityMapper) mapper: IEntityMapper<IUser, UserEntity>,
    @InjectRepository(UserEntity) repository: Repository<UserEntity>,
  ) {
    super(mapper, repository);
  }

  async findOne(where: {
    id?: number;
    username?: string;
  }): Promise<IUser | null> {
    if (Object.keys(where).length === 0) {
      return null;
    }
    const findOption: FindOneOptions = { where };
    const entity = await this.getRepository().findOne(findOption);
    return entity == null ? null : this.getMapper().toAggregate(entity);
  }

  async save(user: IUser, password?: string): Promise<IUser> {
    const entity = this.getMapper().toRootEntity(user);
    if (password) {
      entity.password = password;
    }
    const newEntity = await this.getRepository().save(entity);
    return this.getMapper().toAggregate(newEntity);
  }
}
