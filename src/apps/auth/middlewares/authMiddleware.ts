import { Request, Response } from "express";
import { AuthError } from "../exceptions";
import { TokenService } from "../controller/services";
import type { TokenPayload } from "../types";

function authMiddleware(_err: Error, req: Request, _res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(AuthError.UnauthorizedError());
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) return next(AuthError.UnauthorizedError());
  try {
    req.body.user = TokenService.validateAccessToken(accessToken) as TokenPayload;
  } catch (e) {
    return next(AuthError.UnauthorizedError());
  }
  next();
}

export default authMiddleware;