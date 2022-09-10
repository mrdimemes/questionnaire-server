import { Request, Response } from "express";
import { AuthService } from "./services";
import type {
  RegistrationRequestBody,
  LoginRequestBody,
  LogoutRequestBody,
  RefreshRequestBody
} from "../types";

class AuthController {
  private authService = AuthService;

  async registration(req: Request, res: Response, next: Function) {
    try {
      const { email, name, password } = req.body as RegistrationRequestBody;
      const responseDTO =
        await this.authService.registration(email, name, password);
      return res.json(responseDTO);
    } catch (err) {
      next(err);
    }
  }

  async login(req: Request, res: Response, next: Function) {
    try {
      const { email, password } = req.body as LoginRequestBody;
      const responseDTO = await this.authService.login(email, password);
      return res.json(responseDTO);
    } catch (err) {
      next(err);
    }
  }

  async logout(req: Request, res: Response, next: Function) {
    try {
      const { refreshToken } = req.body as LogoutRequestBody;
      await this.authService.logout(refreshToken);
      return res.json();
    } catch (err) {
      next(err);
    }
  }

  async refresh(req: Request, res: Response, next: Function) {
    try {
      const { refreshToken } = req.body as RefreshRequestBody;
      const responseDTO = await this.authService.refresh(refreshToken);
      return res.json(responseDTO);
    } catch (err) {
      next(err);
    }
  }
}

export default new AuthController();