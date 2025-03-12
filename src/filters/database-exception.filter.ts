import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';
import { Response } from 'express';

@Catch(QueryFailedError)
export class DatabaseExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(DatabaseExceptionFilter.name);

  catch(exception: QueryFailedError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const detail = (exception as any).driverError.detail as string;

    this.logger.error(`Database error: ${detail}`);

    if (detail.includes('violates foreign key constraint')) {
      response.status(400).json({
        statusCode: 400,
        message: 'Referenced record does not exist.',
        error: detail,
      });
      return;
    }

    if (detail.includes('duplicate key value')) {
      response.status(409).json({
        statusCode: 409,
        message: 'Duplicate entry detected.',
        error: detail,
      });
      return;
    }

    response.status(400).json({
      statusCode: 400,
      message: 'Database error occurred.',
      error: detail,
    });
  }
}
