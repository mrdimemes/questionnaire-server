import Jwt from "jsonwebtoken";
import { RefreshTokenConnector } from "../../mysql";
import type { TokenPayload } from "../../types";

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

  validateAccessToken(token: string) {
    return Jwt.verify(token, "" + process.env.JWT_ACCESS_SECRET);
  }

  validateRefreshToken(token: string) {
    return Jwt.verify(token, "" + process.env.JWT_REFRESH_SECRET);
  }
}

export default new TokenService();