import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const res = exception.getResponse() as { message: string[] };

    response.status(status).json({
      code: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      msg: res?.message?.join ? res?.message?.join(',') : exception.message,
    });
  }
}
