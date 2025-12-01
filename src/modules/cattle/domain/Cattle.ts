import { Gender } from "./Gender";

export interface Cattle {
  id: number;
  description: string;
  gender: Gender;
  registrationNumber: string;
  lotNumber: string;
  color: string;
  birthdate: Date;
  observations: string;
  image?: string;
  reasonForWithdrawal?: string;
  status: boolean;
  idFather?: number;
  father?: {
    lotNumber: string;
    registrationNumber: string;
    image?: string;
    status: boolean;
  };
  idMother?: number;
  mother?: {
    lotNumber: string;
    registrationNumber: string;
    image?: string;
    status: boolean;
  };
  idIron?: number;
  iron?: {
    name: string;
    image?: string;
  };
  idRace: number;
  race: {
    name: string;
  };
  idUser: number;
  idGround?: number;
  ground?: {
    name: string;
    image?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface CattleCreate {
  description: string;
  gender: Gender;
  registrationNumber: string;
  lotNumber: string;
  color: string;
  birthdate: Date;
  observations: string;
  image?: File;
  reasonForWithdrawal?: string;
  status: boolean;
  idFather?: number;
  idMother?: number;
  idIron?: number;
  idRace: number;
  idUser: number;
  idGround?: number;
}

export interface CattleUpdate {
  id: number;
  idUser?: number; // para que solo podamos actualizar si tiene un usuario
  description?: string;
  gender?: Gender;
  registrationNumber?: string;
  lotNumber?: string;
  color?: string;
  birthdate?: Date;
  observations?: string;
  image?: File;
  reasonForWithdrawal?: string;
  status?: boolean;
  idFather?: number;
  idMother?: number;
  idIron?: number;
  idRace: number;
  idGround?: number;
}
