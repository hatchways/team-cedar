export interface NotificationsDataSuccess {
  _id: string;
  type: string;
  title: string;
  description?: string;
  read: boolean;
  time: Date;
}

export interface NotificationApiData {
  error?: { message: string };
  success?: {
    notifications: NotificationsDataSuccess[];
  };
}
