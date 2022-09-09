import ApiError from "src/exceptions/ApiError";

class AuthError extends ApiError {
  constructor(status: number, massage: string, errors?: object[]) {
    super(status, massage, errors);
  }

  static UnauthorizedError(massage?: string) {
    return new AuthError(401, massage ?? "Пользователь не авторизован");
  }

  static ForbiddenError(massage?: string) {
    return new AuthError(403, massage ?? "Доступ запрещен");
  }
}

export default AuthError;