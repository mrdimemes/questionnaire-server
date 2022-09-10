import { Request, Response } from "express";
import { ApiError } from "src/exceptions";

function errorMiddleware(
  err: ApiError | Error,
  _req: Request,
  res: Response,
  _next: Function
) {
  console.log(err);

  if (err instanceof ApiError && err.status !== 500) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors
    });
  }
  return res.status(500).json({ massage: "Что-то сломалось. Бип-буп..." })
}

export default errorMiddleware;