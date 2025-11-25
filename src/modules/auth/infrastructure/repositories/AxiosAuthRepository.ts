import { axiosClient } from "@/core/config/axiosClient";
import { AuthLoginResponse } from "../../domain/AuthLoginResponse";
import { AuthRepository } from "../../domain/AuthRepository";
import { ResAPI } from "@/core/shared/domain/ResAPI";
import { UserCreate, User } from "@/modules/user/domain/User";
import { useAuthStore } from "../auth.store";

export class AxiosAuthRpository implements AuthRepository {
  async login(email: string, password: string): Promise<AuthLoginResponse> {
    const {
      data: { data },
    } = await axiosClient.post<ResAPI<AuthLoginResponse>>("/login", {
      email,
      password,
    });

    console.log(data);

    return data;
  }

  async register(user: UserCreate): Promise<User> {
    const {
      data: { data },
    } = await axiosClient.post<ResAPI<User>>("/register", user);

    console.log(data);

    return data;
  }

  logout(): void {
    useAuthStore.getState().clear();
    window.dispatchEvent(new Event("auth-expired"));
  }

  async activate(token: string): Promise<void> {
    console.log(token);
  }

  async sendEmail(id: number): Promise<void> {
    console.log(id);
  }

  saveSession(token: string, user: User): void {
    useAuthStore.getState().setToken(token);
    console.log(user);
    useAuthStore.getState().setUser(user);
  }
}
