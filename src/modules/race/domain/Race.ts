export interface Race {
  id: number;
  name: string;
  description: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface RaceCreate {
  name: string;
  description: string;
  image?: File;
}

export interface RaceUpdate {
  id: number;
  name?: string;
  description?: string;
  image?: File;
}
