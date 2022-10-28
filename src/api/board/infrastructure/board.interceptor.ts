import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class BoardResponseInterceptor implements NestInterceptor {
  intercept(_: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(map((Board) => ({ Board })));
  }
}
