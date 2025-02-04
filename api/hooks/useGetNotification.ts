import { NotificationType } from "@/utils/types";
import { UserService } from "api/services/UserService";
import { useEffect, useState } from "react";

export function useGetNotification() {
  const service = new UserService();
  const [notifications, setNotifications] = useState<NotificationType[]>([]);

  const fetchNotifications = async () => {
    const response = await service.fetchNotifications();
    setNotifications(response.body);
    return response;
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return { notifications }
}