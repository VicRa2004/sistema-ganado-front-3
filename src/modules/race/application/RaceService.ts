import { RaceCreate, RaceUpdate } from "../domain/Race";
import { RaceRepository } from "../domain/RaceRepository";

export const createRaceService = (repository: RaceRepository) => {
  return {
    getAll() {
      return repository.find();
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
