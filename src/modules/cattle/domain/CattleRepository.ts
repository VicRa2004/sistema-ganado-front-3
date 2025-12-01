import { Pagination } from "@/core/shared/domain/Pagination";
import { Gender } from "./Gender";
import { Cattle, CattleCreate, CattleUpdate } from "./Cattle";

export interface CattleFilters {
  page: number;
  limit: number;
  gender?: Gender;
  status?: number;
  idRace?: number;
  idUser?: number;
  idGround?: number;
}

export interface CattleRepository {
  find(filters: CattleFilters): Promise<Pagination<Cattle>>;
  findById(id: number): Promise<Cattle | null>;

  create(cattle: CattleCreate): Promise<Cattle>;
  update(cattle: CattleUpdate): Promise<Cattle>;

  delete(id: number): Promise<void>;
}
