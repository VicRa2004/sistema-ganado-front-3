import { CattleCreate, CattleUpdate } from "../domain/Cattle";
import { CattleFilters, CattleRepository } from "../domain/CattleRepository";

export const createCattleService = (repository: CattleRepository) => {
  return {
    getAll(filters: CattleFilters) {
      return repository.find(filters);
    },
    getOne(id: number) {
      return repository.findById(id);
    },
    create(data: CattleCreate) {
      return repository.create(data);
    },
    update(data: CattleUpdate) {
      return repository.update(data);
    },
    delete(id: number) {
      return repository.delete(id);
    },
  };
};
