import { FetchOptions } from '../../interface/FetchOptions';
import { NotificationApiData } from '../../interface/NotificationApiData';

export async function getAllNotification(): Promise<NotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notifications/all`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function getUnReadNotification(): Promise<NotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/notifications`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
export async function markNotificationsAsRead(): Promise<NotificationApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PUT',
    credentials: 'include',
  };
  return await fetch(`/notifications/read`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
