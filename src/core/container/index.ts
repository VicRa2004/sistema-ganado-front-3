import { createAuthService } from "@/modules/auth/application/AuthService";
import { AxiosAuthRpository } from "@/modules/auth/infrastructure/repositories/AxiosAuthRepository";
import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";
import { createIronService } from "@/modules/iron/application/IronService";
import { AxiosIronRepository } from "@/modules/iron/infrastructure/repositories/AxiosIronRepository";

const authRepository = new AxiosAuthRpository();
const groundRepository = new AxiosGroundRepository();
const ironRepository = new AxiosIronRepository();

const authService = createAuthService(authRepository);
const groundService = createGroundService(groundRepository);
const ironService = createIronService(ironRepository);

export const container = {
  ground: { ...groundService },
  auth: { ...authService },
  iron: { ...ironService },
};
