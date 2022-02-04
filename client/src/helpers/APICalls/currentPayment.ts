import { FetchOptions } from '../../interface/FetchOptions';
import { GetPaymentApiData } from '../../interface/GetPaymentApiData';

export async function currentPayment(): Promise<GetPaymentApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payments/current`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
