import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddlware implements NestMiddleware {
  private _logger = new Logger('HTTP');
  use(req: Request, res: Response, next: NextFunction) {
    const { method, originalUrl } = req;
    const { statusCode, statusMessage } = res;

    const message = `${method}-${originalUrl}-${statusCode} ${statusMessage}`;

    if (statusCode >= 500) {
       this._logger.error(message);
    } else if (statusCode >= 400) {
       this._logger.warn(message);
    } else {
       this._logger.log(message);
    }
    next();
  }
}
