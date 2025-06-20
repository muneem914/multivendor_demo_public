import { Request, Response, NextFunction } from 'express';
import ErrorHandler from '../utils/ErrorHandler';

type HandlerFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<any>;

export const catchAsyncErrors = (handler: HandlerFunction) => {
  return (req: Request, res: Response, next: NextFunction) => {
    handler(req, res, next).catch((error: any) => {
      // Handle specific error types
      if (error instanceof ErrorHandler) {
        return res.status(error.statusCode).json({
          success: false,
          message: error.message,
        });
      }

      // Handle Mongoose errors
      if (error?.name === 'CastError') {
        error = new ErrorHandler(`Resource not found. Invalid ${error?.path}`, 400);
      }

      if (error?.name === 'ValidationError') {
        const messages = Object.values(error.errors).map((val: any) => val.message);
        error = new ErrorHandler(messages.join(', '), 400);
      }

      if (error.code === 11000) {
        const key = Object.keys(error.keyValue)[0];
        error = new ErrorHandler(`Duplicate ${key} entered`, 400);
      }

      // Handle generic errors
      const status = error.statusCode || 500;
      const message = error.message || 'Internal Server Error';
      
      res.status(status).json({
        success: false,
        message,
      });
    });
  };
};