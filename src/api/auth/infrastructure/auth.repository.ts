import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IEntityMapper } from 'src/api/common/interface/mapper.interface';
import { UserEntity } from 'src/api/user/infrastructure/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { IAuth, IAuthId } from '../domain/auth.interface';
import { IAuthRepository } from '../domain/repository.interface';
import { AuthMapper } from './auth.mapper';

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    @Inject(AuthMapper)
    private readonly mapper: IEntityMapper<IAuth, UserEntity>,
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
  ) {}

  async findOne(
    where: { username: string } | { id: IAuthId },
  ): Promise<IAuth | null> {
    const findOption: FindOneOptions<UserEntity> = { where };
    const entity = await this.repository.findOne(findOption);
    return entity == null ? null : this.mapper.toAggregate(entity);
  }

  async update(aggregate: IAuth): Promise<IAuth> {
    const entity = this.mapper.toRootEntity(aggregate);
    await this.repository.save(entity);
    return aggregate;
  }
}
