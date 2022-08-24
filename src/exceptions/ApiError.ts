class ApiError extends Error {
  status: number;
  errors?: object[];

  constructor(
    status: number, massage: string, errors?: object[]
  ) {
    super(massage);
    this.status = status;
    this.errors = errors;
  }

  static BadRequestError(massage: string, errors?: object[]) {
    return new ApiError(400, massage, errors);
  }
}

export default ApiError;