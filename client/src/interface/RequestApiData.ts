export interface RequestApiDataSuccess {
  userId: string;
  sitterId: string;
  start: Date;
  end: Date;
  description?: string;
}

export interface RequestApiData {
  error?: { message: string };
  success?: RequestApiDataSuccess;
}
