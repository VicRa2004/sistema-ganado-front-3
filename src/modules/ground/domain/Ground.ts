export interface Ground {
  id: number;
  name: string;
  image?: string;
  width: number;
  length: number;
  address: string;
  notes: string;
  idUser: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GroundCreate {
  name: string;
  image?: File;
  width: number;
  length: number;
  address: string;
  notes: string;
}

export interface GroundUpdate {
  id: number;
  name?: string;
  image?: File;
  width?: number;
  length?: number;
  address?: string;
  notes?: string;
}
