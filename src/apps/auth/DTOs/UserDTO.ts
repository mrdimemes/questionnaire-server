class UserDTO {
  name: string;
  id: number;
  isAdmin: boolean;

  constructor(name: string, id: number, isAdmin: boolean) {
    this.name = name;
    this.id = id;
    this.isAdmin = isAdmin;
  }
}

export default UserDTO