import { createAuthService } from "@/modules/auth/application/AuthService";
import { AxiosAuthRpository } from "@/modules/auth/infrastructure/repositories/AxiosAuthRepository";
import { createCattleService } from "@/modules/cattle/application/CattleService";
import { AxiosCattleRepository } from "@/modules/cattle/infrastructure/repositories/AxiosCattleRepository";
import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";
import { createIronService } from "@/modules/iron/application/IronService";
import { AxiosIronRepository } from "@/modules/iron/infrastructure/repositories/AxiosIronRepository";

const authRepository = new AxiosAuthRpository();
const groundRepository = new AxiosGroundRepository();
const ironRepository = new AxiosIronRepository();
const cattleRepository = new AxiosCattleRepository();

const authService = createAuthService(authRepository);
const groundService = createGroundService(groundRepository);
const ironService = createIronService(ironRepository);
const cattleService = createCattleService(cattleRepository);

export const container = {
  ground: { ...groundService },
  auth: { ...authService },
  iron: { ...ironService },
  cattle: { ...cattleService },
};
