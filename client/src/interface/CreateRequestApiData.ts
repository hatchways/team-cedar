export interface CreateRequestApiDataSuccess {
  userId: string;
  sitterId: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface CreateRequestApiData {
  error?: { message: string };
  success?: CreateRequestApiDataSuccess;
}
