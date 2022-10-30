import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { BoardModule } from './board/board.module';
import { PostModule } from './post/post.module';

@Module({
  imports: [AuthModule, UserModule, BoardModule, PostModule],
})
export class ApiModule {}
