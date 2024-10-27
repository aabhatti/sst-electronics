import { HttpStatusCode, GENERIC_CONSTANTS } from "../constants";

class AppError extends Error {
  statusCode: number | undefined;
  status: string;
  err: any;
  isOperational: boolean;

  constructor(message: string, statusCode: number, err = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4")
      ? GENERIC_CONSTANTS.FAIL
      : GENERIC_CONSTANTS._ERROR;
    this.isOperational = true;
    this.err = err;

    Error.captureStackTrace(this, this.constructor);
  }
}

class BadRequest extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.BAD_REQUEST, err);
  }
}

class Unauthorized extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.UNAUTHORIZED, err);
  }
}

class Forbidden extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.FORBIDDEN, err);
  }
}

class NotFound extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.NOT_FOUND, err);
  }
}

class InternalServerError extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.INTERNAL_SERVER_ERROR, err);
  }
}

class BadGateway extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.BAD_GATEWAY, err);
  }
}

class Conflict extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.CONFLICT, err);
  }
}

class ExpectationFailed extends AppError {
  constructor(message: string, err = null) {
    super(message, HttpStatusCode.EXPECTATIONFAILED, err);
  }
}

export {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  InternalServerError,
  BadGateway,
  Conflict,
  ExpectationFailed,
};
