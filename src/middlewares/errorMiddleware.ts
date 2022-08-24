import { Request, Response } from "express";
import ApiError from "src/exceptions/ApiError";

function errorMiddleware(
  err: ApiError | Error, _req: Request, res: Response, _next: Function
) {
  console.log(err);

  if (err instanceof ApiError && err.status !== 500) {
    return res.status(err.status).json({
      massage: err.message,
      errors: err.errors
    });
  }
  return res.status(500).json({ massage: "Something broke, beep-boop..." })
}

export default errorMiddleware;