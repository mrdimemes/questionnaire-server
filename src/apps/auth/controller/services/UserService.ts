import { UserConnector } from "../../mysql";

class UserService {
  private userConnector = UserConnector;

  async addUser(email: string, name: string, passwordHash: string) {
    return this.userConnector.addUser(email, name, passwordHash);
  }

  async findUser(id: number) {
    return this.userConnector.findUser(id);
  }

  async findUserByEmail(email: string) {
    return this.userConnector.findUserByEmail(email);
  }

  async removeUser(id: number) {
    return this.userConnector.removeUser(id);
  }
}

export default new UserService();