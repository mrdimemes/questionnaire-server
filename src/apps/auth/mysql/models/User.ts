interface User {
  id: number;
  email: string;
  name: string;
  password_hash: string;
  is_admin: boolean;
}

export default User