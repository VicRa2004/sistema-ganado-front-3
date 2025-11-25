import { GroundCreate, GroundUpdate } from "../domain/Ground";
import { GroundFilters, GroundRepository } from "../domain/GroundRepository";

export const createGroundService = (repository: GroundRepository) => {
  return {
    getAll(filters: GroundFilters) {
      return repository.find(filters);
    },
    getOne(id: number) {
      return repository.findById(id);
    },
    create(ground: GroundCreate) {
      return repository.create(ground);
    },
    update(ground: GroundUpdate) {
      return repository.update(ground);
    },
    delete(id: number) {
      return repository.delete(id);
    },
  };
};
