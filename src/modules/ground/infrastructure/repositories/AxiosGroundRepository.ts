import { Pagination } from "@/core/shared/domain/Pagination";
import { Ground, GroundCreate, GroundUpdate } from "../../domain/Ground";
import { GroundFilters, GroundRepository } from "../../domain/GroundRepository";
import { axiosClient } from "@/core/http/axiosClient";
import { ResAPI } from "@/core/shared/domain/ResAPI";
import { AxiosError } from "axios";

export class AxiosGroundRepository implements GroundRepository {
  async find(filters: GroundFilters): Promise<Pagination<Ground>> {
    const {
      data: { data },
    } = await axiosClient.get<ResAPI<Pagination<Ground>>>("/ground", {
      params: filters,
    });

    // Convertir fechas a objetos Date
    data.items = data.items.map((ground) => ({
      ...ground,
      createdAt: new Date(ground.createdAt),
      updatedAt: new Date(ground.updatedAt),
    }));

    return data;
  }

  async findById(id: number): Promise<Ground | null> {
    try {
      const {
        data: { data },
      } = await axiosClient.get<ResAPI<Ground>>(`/ground/${id}`);

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

  async create(ground: GroundCreate): Promise<Ground> {
    const {
      data: { data },
    } = await axiosClient.post<ResAPI<Ground>>("/ground", ground);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async update(ground: GroundUpdate): Promise<Ground> {
    const {
      data: { data },
    } = await axiosClient.put<ResAPI<Ground>>(`/ground/${ground.id}`, ground);

    return {
      ...data,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/ground/${id}`);
  }
}
