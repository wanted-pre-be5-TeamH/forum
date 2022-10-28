import { SetMetadata } from '@nestjs/common';
import { PUBLIC_KEY } from '../constant/public-key.constant';

export const Public = (isPublic = true) => SetMetadata(PUBLIC_KEY, isPublic);
