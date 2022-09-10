class ApiError extends Error {
  status: number;
  errors?: object[];

  constructor(
    status: number, message: string, errors?: object[]
  ) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequestError(message: string, errors?: object[]) {
    return new ApiError(400, message, errors);
  }

  static NotFoundError(message: string, errors?: object[]) {
    return new ApiError(404, message, errors);
  }
}

export default ApiError;