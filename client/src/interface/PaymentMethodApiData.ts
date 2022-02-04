export interface PaymentMethodApiDataSuccess {
  client_secret?: string;
}

export interface PaymentMethodApiData {
  error?: { message: string };
  success?: PaymentMethodApiDataSuccess;
}
