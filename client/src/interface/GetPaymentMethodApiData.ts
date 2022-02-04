export interface listPaymentMethods {
  id: string;
  object: string;
  card: {
    brand: string;
    checks: {
      cvc_check?: string;
    };
    country?: string;
    exp_month: number;
    exp_year: number;
    last4: string;
    customer: string;
    type: string;
  };
}

export interface GetPaymentMethodApiData {
  error?: string;
  success?: {
    listPaymentMethods: {
      data: listPaymentMethods[];
    };
  };
}
