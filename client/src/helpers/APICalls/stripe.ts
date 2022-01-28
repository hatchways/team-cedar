import { StripeData } from '../../interface/StripeData';
import { FetchOptions } from '../../interface/FetchOptions';

const stripe = async (): Promise<StripeData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    credentials: 'include',
  };
  return await fetch(`/connect/stripe`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default stripe;
