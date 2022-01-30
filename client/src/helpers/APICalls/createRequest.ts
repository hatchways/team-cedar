import { FetchOptions } from '../../interface/FetchOptions';
import { RequestApiData } from '../../interface/RequestApiData';

const createRequest = async (data: {
  sitterId: string;
  start: Date;
  end: Date;
  description?: string;
}): Promise<RequestApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/request`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createRequest;
