
class ErrorHandler extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;

    // Captures stack trace excluding constructor call from it
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      message: this.message,
      stack: process.env.NODE_ENV === 'development' ? this.stack : undefined,
    };
  }
}

export default ErrorHandler;
