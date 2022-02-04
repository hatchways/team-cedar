export interface Profile {
  userId: string;
  name: string;
  address?: string;
  rate: number;
  occupation?: string;
  rating?: number;
  pricePerHour?: number;
  description?: string;
  photo?: string;
}
export interface ProfileApiData {
  petsitter?: Profile[];
  error?: { message: string };
}
