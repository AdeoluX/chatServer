class ApiError extends Error {
  isOperational: boolean;
  statusCode: any;
  constructor(
    statusCode: any,
    message: any,
    isOperational = false,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ApiError;
