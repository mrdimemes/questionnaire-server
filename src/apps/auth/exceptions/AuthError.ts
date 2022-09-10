import ApiError from "src/exceptions/ApiError";

class AuthError extends ApiError {
  constructor(status: number, message: string, errors?: object[]) {
    super(status, message, errors);
  }

  static UnauthorizedError(message?: string) {
    return new AuthError(401, message ?? "Пользователь не авторизован");
  }

  static ForbiddenError(message?: string) {
    return new AuthError(403, message ?? "Доступ запрещен");
  }
}

export default AuthError;