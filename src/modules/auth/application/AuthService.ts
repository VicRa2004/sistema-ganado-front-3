import { UserCreate } from "@/modules/user/domain/User";
import { AuthRepository } from "../domain/AuthRepository";
import { useAuthStore } from "@/modules/auth/infrastructure/auth.store";

export const createAuthService = (repository: AuthRepository) => {
  return {
    async login(email: string, password: string) {
      const data = await repository.login(email, password);

      useAuthStore.getState().setToken(data.token);
      useAuthStore.getState().setUser(data.user);

      return data;
    },
    async logout() {
      useAuthStore.getState().clear();

      window.dispatchEvent(new Event("auth-expired"));
    },
    async register(user: UserCreate) {
      const data = await repository.register(user);

      return data;
    },
    async sendEmail(id: number) {
      await repository.sendEmail(id);
    },
    async activate(token: string) {
      await repository.activate(token);
    },
  };
};
