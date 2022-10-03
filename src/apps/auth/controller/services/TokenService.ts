import dotenv from "dotenv";
import Jwt from "jsonwebtoken";
import { RefreshTokenConnector } from "../../mysql";
import type { TokenPayload } from "../../types";

dotenv.config();


class TokenService {
  private refreshTokenConnector = RefreshTokenConnector;

  generateTokens(payload: TokenPayload) {
    const accessToken = Jwt.sign(
      payload,
      "" + process.env.JWT_ACCESS_SECRET,
      { expiresIn: `${process.env.JWT_ACCESS_LIFETIME}m` }
    );
    const refreshToken = Jwt.sign(
      payload,
      "" + process.env.JWT_REFRESH_SERCRET,
      { expiresIn: `${process.env.JWT_REFRESH_LIFETIME}d` }
    );
    return { accessToken, refreshToken }
  }

  async saveRefreshToken(userId: number, token: string) {
    return this.refreshTokenConnector.addRefreshToken(userId, token);
  }

  async removeRefreshToken(token: string) {
    return this.refreshTokenConnector.removeRefreshToken(token);
  }

  async removeExpiredTokens(userId: number) {
    const lifeTime = Number(process.env.JWT_REFRESH_LIFETIME) ?? 30;
    await this.refreshTokenConnector.removeExpiredTokens(userId, lifeTime);
  }

  validateAccessToken(token: string) {
    return Jwt.verify(token, "" + process.env.JWT_ACCESS_SECRET);
  }

  validateRefreshToken(token: string) {
    return Jwt.verify(token, "" + process.env.JWT_REFRESH_SECRET);
  }
}

export default new TokenService();