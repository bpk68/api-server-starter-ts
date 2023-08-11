export interface User {
  name: string;
  password: string;
  profession: string;
  id: number;
}

export interface UserList {
  users: User[];
}
