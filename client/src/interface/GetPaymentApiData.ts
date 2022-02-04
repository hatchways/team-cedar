export interface GetPaymentDataSuccess {
  _id: string;
  rate: number;
  hoursOfService: {
    startTime: number;
    endTime: number;
  };
  customerId: string;
  sitterId: {
    name: string;
  };
  paid: boolean;
  cancel: boolean;
}

export interface GetPaymentApiData {
  error?: { message: string };
  success?: {
    payment: GetPaymentDataSuccess[];
  };
}
