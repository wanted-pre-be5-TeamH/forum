import { SetMetadata } from '@nestjs/common';
import { UserRole } from 'src/api/user/domain/user.enum';
import { ROLES_KEY } from '../constant/roles-key.constant';

export const Permission = (role: UserRole) => SetMetadata(ROLES_KEY, role);
