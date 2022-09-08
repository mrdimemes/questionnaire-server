import { UserConnector } from "../../mysql";

class UserService {
  private userConnector = UserConnector;

  async addUser(email: string, name: string, passwordHash: string) {
    await this.userConnector.addUser(email, name, passwordHash);
  }

  async removeUser(id: number) {
    await this.userConnector.removeUser(id);
  }
}

export default new UserService();