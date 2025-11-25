import { UserRol } from "./UserRol";

export interface User {
  id: number;
  fullName: string;
  userName: string;
  email: string;
  rol: UserRol;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreate {
  fullName: string;
  userName: string;
  email: string;
  rol: UserRol;
}

export interface UserUpdate {
  fullName: string;
  userName: string;
}
