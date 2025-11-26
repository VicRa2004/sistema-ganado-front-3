import { IronCreate, IronUpdate } from "../domain/Iron";
import { IronFilters, IronRepository } from "../domain/IronRepository";

export const createIronService = (repository: IronRepository) => {
  return {
    getAll(filters: IronFilters) {
      return repository.find(filters);
    },
    getOne(id: number) {
      return repository.findById(id);
    },
    create(iron: IronCreate) {
      return repository.create(iron);
    },
    update(iron: IronUpdate) {
      return repository.update(iron);
    },
    delete(id: number) {
      return repository.delete(id);
    },
  };
};
