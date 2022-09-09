import { UserService, HashService, TokenService } from "./";
import { UserDTO, LoginResponseDTO, RefreshResponseDTO } from "../../DTOs";
import { TokenPayload } from "../../types";

class AuthService {
  private userService = UserService;
  private hashService = HashService;
  private tokenService = TokenService;

  async registration(email: string, name: string, password: string) {
    const passwordHash = this.hashService.getHash(password);
    const userId = await this.userService.addUser(email, name, passwordHash);
    const tokens = this.tokenService.generateTokens({ userId });
    const user = await this.userService.findUser(userId);
    const userDTO = new UserDTO(user.name, user.email, user.is_admin);
    return new LoginResponseDTO(
      userDTO,
      tokens.accessToken,
      tokens.refreshToken
    );
  }

  async login(email: string, password: string) {
    const user = await this.userService.findUserByEmail(email);
    const isPasswordsMatch =
      this.hashService.checkHash(password, user.password_hash);
    if (!isPasswordsMatch) throw Error("Wrong password");
    const tokens = this.tokenService.generateTokens({ userId: user.id });
    const userDTO = new UserDTO(user.name, user.email, user.is_admin);
    return new LoginResponseDTO(
      userDTO,
      tokens.accessToken,
      tokens.refreshToken
    );
  }

  async logout(refreshToken: string) {
    await this.tokenService.removeRefreshToken(refreshToken);
  }

  async refresh(refreshToken: string) {
    const tokenPayload =
      this.tokenService.validateRefreshToken(refreshToken) as TokenPayload;
    await this.tokenService.removeRefreshToken(refreshToken);
    const tokens = this.tokenService.generateTokens(tokenPayload);
    return new RefreshResponseDTO(tokens.accessToken, tokens.refreshToken);
  }
}

export default new AuthService();