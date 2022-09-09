import { UserDTO } from "./";

class LoginResponseDTO {
  user: UserDTO;
  accessToken: string;
  refreshToken: string;

  constructor(user: UserDTO, accessToken: string, refreshToken: string) {
    this.user = user;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
  }
}

export default LoginResponseDTO