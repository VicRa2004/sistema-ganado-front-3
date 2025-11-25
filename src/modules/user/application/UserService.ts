import { UserCreate, UserUpdate } from "../domain/User";
import { UserFilters, UserRepository } from "../domain/UserRepository";

export const createUserService = (repository: UserRepository) => {
  return {
    getAll(filters: UserFilters) {
      return repository.find(filters);
    },

    getOne(id: number) {
      return repository.findById(id);
    },
    getOneByEmail(email: string) {
      return repository.findByEmail(email);
    },
    create(user: UserCreate) {
      return repository.create(user);
    },
    update(user: UserUpdate) {
      return repository.update(user);
    },
    delete(id: number) {
      return repository.delete(id);
    },
  };
};
