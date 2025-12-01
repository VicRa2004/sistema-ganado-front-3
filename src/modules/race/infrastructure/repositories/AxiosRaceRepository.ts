import { Race, RaceCreate, RaceUpdate } from "../../domain/Race";
import { RaceRepository } from "../../domain/RaceRepository";
import { axiosClient } from "@/core/config/axiosClient";
import { ResAPI } from "@/core/shared/domain/ResAPI";
import { AxiosError } from "axios";

export class AxiosRaceRepository implements RaceRepository {
  async find(): Promise<Race[]> {
    const {
      data: { data },
    } = await axiosClient.get<ResAPI<Race[]>>("/race");

    // Mapeamos el array para convertir las fechas de cada elemento
    return data.map((race) => ({
      ...race,
      // Asumiendo que la carrera tiene una fecha de evento específica además de created/updated
      // date: new Date(race.date),
      createdAt: new Date(race.createdAt),
      updatedAt: new Date(race.updatedAt),
    }));
  }

  async findById(id: number): Promise<Race | null> {
    try {
      const {
        data: { data },
      } = await axiosClient.get<ResAPI<Race>>(`/race/${id}`);

      return {
        ...data,
        createdAt: new Date(data.createdAt),
        updatedAt: new Date(data.updatedAt),
      };
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return null;
      }
      throw error;
    }
  }

  async create(race: RaceCreate): Promise<Race> {
    const form = new FormData();

    // Agrega aquí los campos definidos en tu interfaz RaceCreate
    form.append("name", race.name);

    // Ejemplo: Si Race tiene fecha de evento
    // form.append("date", race.date.toISOString());

    // Ejemplo: Si Race tiene imagen (siguiendo el patrón de Ground)
    // if (race.image) {
    //   form.append("image", race.image);
    // }

    // NOTA: Ajusta estos campos según tu modelo real de RaceCreate

    const {
      data: { data },
    } = await axiosClient.post<ResAPI<Race>>("/race", form);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async update(race: RaceUpdate): Promise<Race> {
    const form = new FormData();

    form.append("id", JSON.stringify(race.id));

    if (race.name) {
      form.append("name", race.name);
    }

    // Agrega aquí el resto de campos opcionales de RaceUpdate
    // if (race.date) form.append("date", race.date.toISOString());
    // if (race.image) form.append("image", race.image);

    const {
      data: { data },
    } = await axiosClient.put<ResAPI<Race>>(`/race/${race.id}`, form);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/race/${id}`);
  }
}
