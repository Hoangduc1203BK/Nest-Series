export interface UserKey {
  id: string;
}

export interface User extends UserKey {
  username: string;
  email: string;
  age: number;
  address: number;
  ctime: number;
  mtime: number;
}
