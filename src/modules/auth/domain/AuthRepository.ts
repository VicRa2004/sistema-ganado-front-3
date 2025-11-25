import { User, UserCreate } from "@/modules/user/domain/User";
import { AuthLoginResponse } from "./AuthLoginResponse";

export interface AuthRepository {
  login(email: string, password: string): Promise<AuthLoginResponse>;
  register(user: UserCreate): Promise<User>;
  logout(): void;
  sendEmail(id: number): Promise<void>;
  activate(token: string): Promise<void>;
  saveSession(token: string, user: User): void;
}
