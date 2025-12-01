import { AxiosError } from "axios";
import { axiosClient } from "@/core/config/axiosClient";
import { ResAPI } from "@/core/shared/domain/ResAPI";
import { Pagination } from "@/core/shared/domain/Pagination";
import {
  Cattle,
  CattleCreate,
  CattleUpdate,
} from "@/modules/cattle/domain/Cattle"; // Asegúrate que la ruta sea correcta
import {
  CattleFilters,
  CattleRepository,
} from "@/modules/cattle/domain/CattleRepository";

export class AxiosCattleRepository implements CattleRepository {
  async find(filters: CattleFilters): Promise<Pagination<Cattle>> {
    const {
      data: { data },
    } = await axiosClient.get<ResAPI<Pagination<Cattle>>>("/cattle", {
      params: filters,
    });

    // Mapeamos para convertir las fechas de string a objetos Date
    data.items = data.items.map((cattle) => ({
      ...cattle,
      birthdate: new Date(cattle.birthdate),
      createdAt: new Date(cattle.createdAt),
      updatedAt: new Date(cattle.updatedAt),
    }));

    return data;
  }

  async findById(id: number): Promise<Cattle | null> {
    try {
      const {
        data: { data },
      } = await axiosClient.get<ResAPI<Cattle>>(`/cattle/${id}`);

      return {
        ...data,
        birthdate: new Date(data.birthdate),
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

  async create(cattle: CattleCreate): Promise<Cattle> {
    const form = new FormData();

    // Campos obligatorios (Strings y Primitivos)
    form.append("description", cattle.description);
    form.append("gender", cattle.gender);
    form.append("registrationNumber", cattle.registrationNumber);
    form.append("lotNumber", cattle.lotNumber);
    form.append("color", cattle.color);
    form.append("birthdate", cattle.birthdate.toISOString()); // Enviar fecha en formato ISO
    form.append("observations", cattle.observations);
    form.append("status", JSON.stringify(cattle.status));
    form.append("idRace", JSON.stringify(cattle.idRace));
    form.append("idUser", JSON.stringify(cattle.idUser));

    // Campos Opcionales
    if (cattle.image) {
      form.append("image", cattle.image);
    }
    if (cattle.reasonForWithdrawal) {
      form.append("reasonForWithdrawal", cattle.reasonForWithdrawal);
    }
    if (cattle.idFather) {
      form.append("idFather", JSON.stringify(cattle.idFather));
    }
    if (cattle.idMother) {
      form.append("idMother", JSON.stringify(cattle.idMother));
    }
    if (cattle.idIron) {
      form.append("idIron", JSON.stringify(cattle.idIron));
    }
    if (cattle.idGround) {
      form.append("idGround", JSON.stringify(cattle.idGround));
    }

    const {
      data: { data },
    } = await axiosClient.post<ResAPI<Cattle>>("/cattle", form);

    return {
      ...data,
      birthdate: new Date(data.birthdate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async update(cattle: CattleUpdate): Promise<Cattle> {
    const form = new FormData();

    form.append("id", JSON.stringify(cattle.id));

    // Validamos existencia antes de agregar al FormData para permitir actualizaciones parciales
    if (cattle.description) form.append("description", cattle.description);
    if (cattle.gender) form.append("gender", cattle.gender);
    if (cattle.registrationNumber)
      form.append("registrationNumber", cattle.registrationNumber);
    if (cattle.lotNumber) form.append("lotNumber", cattle.lotNumber);
    if (cattle.color) form.append("color", cattle.color);
    if (cattle.birthdate)
      form.append("birthdate", cattle.birthdate.toISOString());
    if (cattle.observations) form.append("observations", cattle.observations);

    // Booleanos y Números
    if (cattle.status !== undefined)
      form.append("status", JSON.stringify(cattle.status));
    if (cattle.idRace) form.append("idRace", JSON.stringify(cattle.idRace));
    if (cattle.idUser) form.append("idUser", JSON.stringify(cattle.idUser));

    // Relaciones opcionales (pueden venir null o undefined, verificamos si están definidos)
    if (cattle.idFather !== undefined)
      form.append("idFather", JSON.stringify(cattle.idFather));
    if (cattle.idMother !== undefined)
      form.append("idMother", JSON.stringify(cattle.idMother));
    if (cattle.idIron !== undefined)
      form.append("idIron", JSON.stringify(cattle.idIron));
    if (cattle.idGround !== undefined)
      form.append("idGround", JSON.stringify(cattle.idGround));

    // Imagen y Razón de retiro
    if (cattle.image) {
      form.append("image", cattle.image);
    }
    if (cattle.reasonForWithdrawal) {
      form.append("reasonForWithdrawal", cattle.reasonForWithdrawal);
    }

    const {
      data: { data },
    } = await axiosClient.put<ResAPI<Cattle>>(`/cattle/${cattle.id}`, form);

    return {
      ...data,
      birthdate: new Date(data.birthdate),
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt),
    };
  }

  async delete(id: number): Promise<void> {
    await axiosClient.delete(`/cattle/${id}`);
  }
}
