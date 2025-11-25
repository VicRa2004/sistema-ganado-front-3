import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground, GroundCreate, GroundUpdate } from "./Ground";

export interface GroundFilters {
  page: number;
  limit: number;
}

export interface GroundRepository {
  find(filters: GroundFilters): Promise<Pagination<Ground>>;
  findById(id: number): Promise<Ground | null>;

  create(ground: GroundCreate): Promise<Ground>;
  update(ground: GroundUpdate): Promise<Ground>;

  delete(id: number): Promise<void>;
}
