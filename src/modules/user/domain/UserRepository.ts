import { Pagination } from "@/core/shared/domain/Pagination";
import { UserRol } from "./UserRol";
import { User, UserCreate, UserUpdate } from "./User";

export interface UserFilters {
  page: number;
  limit: number;
  email?: string;
  rol?: UserRol;
}

export interface UserRepository {
  find(filters: UserFilters): Promise<Pagination<User>>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User>;

  create(user: UserCreate): Promise<User>;
  update(user: UserUpdate): Promise<User>;

  delete(id: number): Promise<void>;
}
