import { Request, Response } from "express";
import { AuthError } from "../exceptions";
import { TokenService, UserService } from "../controller/services";

import type { TokenPayload } from "../types";

function adminRightsMiddleware(req: Request, _res: Response, next: Function) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(AuthError.UnauthorizedError());
  const accessToken = authHeader.split(" ")[1];
  if (!accessToken) return next(AuthError.UnauthorizedError());
  try {
    const tokenPayload =
      TokenService.validateAccessToken(accessToken) as TokenPayload;
    UserService.findUser(tokenPayload.userId).then(user => {
      if (user.is_admin) {
        req.body.user = tokenPayload;
      } else {
        return next(AuthError.ForbiddenError());
      }
    });
  } catch (e) {
    return next(AuthError.ForbiddenError());
  }
  next();
}

export default adminRightsMiddleware;