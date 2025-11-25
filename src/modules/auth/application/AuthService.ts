import { UserCreate } from "@/modules/user/domain/User";
import { AuthRepository } from "../domain/AuthRepository";

export const createAuthService = (repository: AuthRepository) => {
  return {
    async login(email: string, password: string) {
      const data = await repository.login(email, password);

      repository.saveSession(data.token, data.user);

      return data;
    },
    logout() {
      repository.logout();
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
