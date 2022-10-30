import { PostCreateUsecase } from './post.create.usecase';
import { PostFindManyUsecase } from './post.findMany.usecase';
import { PostFindOneUsecase } from './post.findOne.usecase';
import { PostRemoveUsecase } from './post.remove.usecase';

export const services = [
  PostCreateUsecase,
  PostFindOneUsecase,
  PostFindManyUsecase,
  PostRemoveUsecase,
];
