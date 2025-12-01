import { RaceCreate, RaceUpdate } from "../domain/Race";
import { RaceRepository } from "../domain/RaceRepository";

export const createRaceService = (repository: RaceRepository) => {
  return {
    async getAll() {
      const data = await repository.find();

      console.log({ data });

      return data;
    },
    getOne(id: number) {
      return repository.findById(id);
    },
    create(data: RaceCreate) {
      return repository.create(data);
    },
    update(data: RaceUpdate) {
      return repository.update(data);
    },
    delete(id: number) {
      return repository.delete(id);
    },
  };
};
