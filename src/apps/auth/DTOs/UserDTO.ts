class UserDTO {
  name: string;
  email: string;
  isAdmin: boolean;

  constructor(name: string, email: string, isAdmin: boolean) {
    this.name = name;
    this.email = email;
    this.isAdmin = isAdmin;
  }
}

export default UserDTO