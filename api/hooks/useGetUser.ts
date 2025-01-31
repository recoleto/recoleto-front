import { Address, CompanyType, UserProfileType, UserType } from "@/utils/types"
import { AuthContext } from "api/context/auth"
import { AuthService } from "api/services/AuthService"
import { UserService } from "api/services/UserService"
import { useContext, useEffect, useState } from "react"

export function useGetUser() {
  const [user, setUser] = useState<UserProfileType>()
  const service = new AuthService()
  const userService = new UserService();
  const auth = useContext(AuthContext);

  const fetchUser = async () => {
    const response = await service.getUserAuthenticated()
    setUser(response.body)
    return response;
  }

  const updateUser = async (updatedUser: UserProfileType) => {
    const response = await userService.updateUser(updatedUser);
    setUser(response.body);
    return response;

  }

  const disableAccount = async () => {
    const response = await userService.disableAccount()
    return response;
  }

  const logOut = async () => {
    auth.logOut()
  }
  useEffect(() => {
    fetchUser();
  }, []);

  return { user, fetchUser, disableAccount, updateUser, logOut }
}   