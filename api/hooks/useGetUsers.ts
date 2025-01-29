import { UserType } from "@/utils/types";
import { StatusCode } from "api/client/IHttpClient";
import { UserService } from "api/services/UserService"
import { useEffect, useState } from "react";

export function useGetUsers() {
  const service = new UserService();
  const [users, setUsers] = useState<UserType[]>([]);

  const fetchAllUsers = async () => {
    const response = await service.fetchAllUsers();
    setUsers(response.body);
    return response;
  }

  useEffect(() => {
    fetchAllUsers();
  }, [])

  return {
    users
  }
}