import { CompanyType, UserType } from "@/utils/types"
import { StatusCode } from "api/client/IHttpClient"
import { AuthService } from "api/services/AuthService"
import { useEffect, useState } from "react"

export function useGetUser() {
    const [user, setUser] = useState<CompanyType & UserType | null>(null)
    const service = new AuthService()
    const role = localStorage.getItem('@Auth:role')

    const fetchUser = async () => {
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

    useEffect(() => {
        fetchUser();
    }, []);

    return { user, role, refetchUser : fetchUser }
}   