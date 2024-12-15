import { CompanyType, UserType } from "@/utils/types"
import { StatusCode } from "api/client/IHttpClient"
import { AuthService } from "api/services/AuthService"
import { CompanyService } from "api/services/CompanyService"
import { UserService } from "api/services/UserService"
import { useEffect, useState } from "react"
import {getData} from "@/utils/store-data";

export function useGetUser() {
    const [user, setUser] = useState<CompanyType & UserType | null>(null)
    const [role, setRole] = useState<string | null>(null)
    const service = new AuthService()

    const fetchUser = async () => {
      setRole(await getData('@Auth:role') as string)
       if(role === 'EMPRESA') {
          const response = await service.getCompanyAuthenticated()
          if(response.statusCode === StatusCode.Ok) {
            setUser(response.body)
          } else {
            setUser(null)
          }
       }
       if (role === 'USUARIO') {
          const response = await service.getUserAuthenticated()
          if(response.statusCode === StatusCode.Ok) {
            setUser(response.body)
          } else {
            setUser(null)
          }
       }
    }
  
    const updateUser = async (updatedUser: CompanyType & UserType) => {
      if (role === 'EMPRESA') {
          const companyService = new CompanyService();
          const response = await companyService.updateCompany(updatedUser); // Assume a função updateCompany
          if (response.statusCode === StatusCode.Ok) {
              setUser(response.body); // Atualiza o estado com os novos dados
          } else {
              return { ...response, reject: 'Erro ao atualizar dados da empresa' };
          }
      } 
      if (role === 'USUARIO') {
          const userService = new UserService();
          const response = await userService.updateUser(updatedUser); // Assume a função updateUser
          if (response.statusCode === StatusCode.Ok) {
              setUser(response.body); // Atualiza o estado com os novos dados
          } else {
              return { ...response, reject: 'Erro ao atualizar dados do usuário' };
          }
      }
  };

    const disableAccount = async () => {
      if (role === 'EMPRESA') {
        const companyService = new CompanyService()
        const response = await companyService.disableAccount()
        if(response.statusCode === StatusCode.Ok) {
          setUser(null)
        } else {
          return {...response, reject: 'Erro ao desativar conta'}
        }
      } 
      if (role === 'USUARIO') {
        const userService = new UserService()
        const response = await userService.disableAccount()
        if(response.statusCode === StatusCode.Ok) {
          setUser(null)
        } else {
          return {...response, reject: 'Erro ao desativar conta'}
        }
    }
  }
    useEffect(() => {
        fetchUser();
    }, []);

    return { user, role, refetchUser : fetchUser, disableAccount, updateUser }
}   