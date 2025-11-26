import { Pagination } from "@/core/shared/domain/Pagination";
import { Iron, IronCreate, IronUpdate } from "../../domain/Iron"; // Asegúrate de que la ruta sea correcta
import { IronFilters, IronRepository } from "../../domain/IronRepository"; // Asegúrate de que la ruta sea correcta
import { axiosClient } from "@/core/config/axiosClient";
import { ResAPI } from "@/core/shared/domain/ResAPI";
import { AxiosError } from "axios";

export class AxiosIronRepository implements IronRepository {
  async find(filters: IronFilters): Promise<Pagination<Iron>> {
    const {
      data: { data },
    } = await axiosClient.get<ResAPI<Pagination<Iron>>>("/iron", {
      params: filters,
    });

    // Convertir fechas a objetos Date
    data.items = data.items.map((iron) => ({
      ...iron,
      createdAt: new Date(iron.createdAt),
      updatedAt: new Date(iron.updatedAt),
    }));

    return data;
  }

  async findById(id: number): Promise<Iron | null> {
    try {
      const {
        data: { data },
      } = await axiosClient.get<ResAPI<Iron>>(`/iron/${id}`);

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

  async create(iron: IronCreate): Promise<Iron> {
    const form = new FormData();

    // Basado en tu interfaz IronCreate, estos campos son obligatorios
    form.append("name", iron.name);
    form.append("image", iron.image);

    const {
      data: { data },
    } = await axiosClient.post<ResAPI<Iron>>("/iron", form);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  // Nota: Asumo que IronUpdate recibe un ID, aunque no estaba explícito en tu interfaz anterior,
  // es necesario para saber qué registro actualizar (iron.id).
  async update(iron: IronUpdate & { id: number }): Promise<Iron> {
    const form = new FormData();

    form.append("id", JSON.stringify(iron.id));

    if (iron.name) {
      form.append("name", iron.name);
    }

    // Solo agregamos la imagen si el usuario subió una nueva
    if (iron.image) {
      console.log(iron.image);
      form.append("image", iron.image);
    }

    const {
      data: { data },
    } = await axiosClient.put<ResAPI<Iron>>(`/iron/${iron.id}`, form);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/iron/${id}`);
  }
}
