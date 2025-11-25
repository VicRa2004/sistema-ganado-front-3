import { createGroundService } from "@/modules/ground/application/GroundService";
import { AxiosGroundRepository } from "@/modules/ground/infrastructure/repositories/AxiosGroundRepository";

const groundRepository = new AxiosGroundRepository();

const groundService = createGroundService(groundRepository);

export const container = {
  groundService,
};
