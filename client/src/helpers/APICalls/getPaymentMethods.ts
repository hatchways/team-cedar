import { FetchOptions } from '../../interface/FetchOptions';
import { GetPaymentMethodApiData } from '../../interface/GetPaymentMethodApiData';

const getPaymentMethod = async (): Promise<GetPaymentMethodApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/payment_methods/session`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getPaymentMethod;
