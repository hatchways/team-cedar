export interface Request {
  _id: string;
  sitterId: {
    name: string;
  };
  start: Date;
  end: Date;
  accepted: boolean;
  declined: boolean;
  paid: boolean;
  description: string;
  updatedAt: Date;
}

export interface RequestApiData {
  requests?: Request[];
  error?: { message: string };
}
