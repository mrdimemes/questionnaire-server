import { UserService, HashService, TokenService } from "./";
import { UserDTO, LoginResponseDTO, RefreshResponseDTO } from "../../DTOs";
import { User } from "../../mysql/models";
import { ApiError } from "src/exceptions";
import { AuthError } from "../../exceptions";
import type { TokenPayload, TokenPair } from "../../types";

class AuthService {
  private userService = UserService;
  private hashService = HashService;
  private tokenService = TokenService;

  private getLoginResponse(user: User, tokens: TokenPair) {
    const userDTO = new UserDTO(user.name, user.id, user.is_admin);
    return new LoginResponseDTO(
      userDTO,
      tokens.accessToken,
      tokens.refreshToken
    );
  }

  async registration(email: string, name: string, password: string) {
    const passwordHash = this.hashService.getHash(password);
    const userId = await this.userService.addUser(email, name, passwordHash);
    const tokens = this.tokenService.generateTokens({ userId });
    await this.tokenService.saveRefreshToken(userId, tokens.refreshToken);
    const user = await this.userService.findUser(userId);
    return this.getLoginResponse(user, tokens);
  }

  async login(email: string, password: string) {
    try {
      const user = await this.userService.findUserByEmail(email);
      const isPasswordsMatch =
        this.hashService.checkHash(password, user.password_hash);
      if (!isPasswordsMatch) {
        throw ApiError.BadRequestError("Неправильный пароль");
      }
      await this.tokenService.removeExpiredTokens(user.id);
      const tokens = this.tokenService.generateTokens({ userId: user.id });
      await this.tokenService.saveRefreshToken(user.id, tokens.refreshToken);
      return this.getLoginResponse(user, tokens);
    } catch (err) {
      if (err instanceof ApiError && err.status === 400) {
        throw ApiError.BadRequestError("Неправильный логин или пароль");
      } else {
        throw err;
      }
    }
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    try {
      const tokenPayload =
        this.tokenService.validateRefreshToken(refreshToken) as TokenPayload;
      await this.tokenService.removeRefreshToken(refreshToken);
      await this.tokenService.removeExpiredTokens(tokenPayload.userId);
      const tokens = this.tokenService.generateTokens(tokenPayload);
      return new RefreshResponseDTO(tokens.accessToken, tokens.refreshToken);
    } catch (err) {
      throw AuthError.UnauthorizedError("Недействительный токен");
    }
  }
}

export default new AuthService();