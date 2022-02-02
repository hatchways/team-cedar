import { FetchOptions } from '../../interface/FetchOptions';
import { PaymentMethodApiData } from '../../interface/PaymentMethodApiData';

const paymentMethods = async (): Promise<PaymentMethodApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
  };
  return await fetch(`/payment_methods/session`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default paymentMethods;
