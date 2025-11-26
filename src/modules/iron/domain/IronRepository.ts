import { Pagination } from "@/core/shared/domain/Pagination";
import { Iron, IronCreate, IronUpdate } from "./Iron";

export interface IronFilters {
  page: number;
  limit: number;
}

export interface IronRepository {
  find(filters: IronFilters): Promise<Pagination<Iron>>;
  findById(id: number): Promise<Iron | null>;

  create(iron: IronCreate): Promise<Iron>;
  update(iron: IronUpdate): Promise<Iron>;

  delete(id: number): Promise<void>;
}
