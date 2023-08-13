import dotenv from 'dotenv';
dotenv.config();
import httpStatus from 'http-status';
import ApiError from '../utils/ApiError';
// const ApiError = require('../utils/ApiError');
// const { errorResponse } = require('../utils/responder');
import { errorResponse } from '../utils/responder';

const errorConverter = (err, req, res, next) => {
  let error = err;
  if (error.name === 'CastError') {
    const message = `Resource not found`;
    error = new ApiError(httpStatus.NOT_FOUND, 'Resource not Found');
  }
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = new ApiError(httpStatus.FORBIDDEN, message);
  }
  // Mongoose duplicate key
  if (error.code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ApiError(httpStatus.BAD_REQUEST, message);
  }
  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map((val: any) => val.message);
    error = new ApiError(httpStatus.BAD_REQUEST, message);
  }
  if (err.name === 'JsonWebTokenError') {
    const message = 'token expired';
    error = new ApiError(httpStatus.FORBIDDEN, message);
  }
  if (!(error instanceof ApiError)) {
    const statusCode = error.statusCode || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new ApiError(statusCode, message, false, err.stack);
  }

  next(error);
};

const errorHandler = (err, req, res, next) => {
  let { statusCode, message } = err;
  statusCode = statusCode || httpStatus.INTERNAL_SERVER_ERROR;
  if (statusCode === httpStatus.INTERNAL_SERVER_ERROR) {
    message = 'Oh sugar! we have a problem, please check back later';
  }
  res.locals.errorMessage = err.message;
  if (
    statusCode === httpStatus.INTERNAL_SERVER_ERROR ||
    process.env.ENV === 'test'
  ) {
    console.log(err);
  }

  return errorResponse(
    res,
    message,
    statusCode,
    process.env.ENV === 'test' && { stack: err.stack }
  );
};

export { errorConverter, errorHandler };
