export interface Iron {
  id: number;
  name: string;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IronCreate {
  name: string;
  image: File;
}

export interface IronUpdate {
  name?: string;
  image?: File;
}
