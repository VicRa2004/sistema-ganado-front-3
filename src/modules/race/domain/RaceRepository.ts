import { Pagination } from "@/core/shared/domain/Pagination";
import { Race, RaceCreate, RaceUpdate } from "./Race";

export interface RaceRepository {
  find(): Promise<Pagination<Race>>;
  findById(id: number): Promise<Race | null>;

  create(race: RaceCreate): Promise<Race>;
  update(race: RaceUpdate): Promise<Race>;

  delete(id: number): Promise<void>;
}
