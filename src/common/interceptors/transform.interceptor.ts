import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MESSAGE_KEY } from '../decorators/message.decorator';

export interface Response<T> {
  data: T;
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private readonly reflector: Reflector) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const requiredMessage = this.reflector.get<string>(
      MESSAGE_KEY,
      context.getHandler(),
    );

    console.log(requiredMessage);

    return next.handle().pipe(
      map((data) => {
        return {
          data,
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: requiredMessage || 'Request success!',
        };
      }),
    );
  }
}
