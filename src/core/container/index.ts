import { createAuthService } from "@/modules/auth/application/AuthService";
import { AxiosAuthRpository } from "@/modules/auth/infrastructure/repositories/AxiosAuthRepository";
import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";

const authRepository = new AxiosAuthRpository();
const groundRepository = new AxiosGroundRepository();

const authService = createAuthService(authRepository);
const groundService = createGroundService(groundRepository);

export const container = {
  ground: { ...groundService },
  auth: { ...authService },
};
