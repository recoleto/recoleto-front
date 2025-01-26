import { CompanyProfileType } from "@/utils/types";
import { AuthContext } from "api/context/auth";
import { AuthService } from "api/services/AuthService";
import { CompanyService } from "api/services/CompanyService";
import { useContext, useEffect, useState } from "react";

export function useGetCompany() {
  const [company, setCompany] = useState<CompanyProfileType>()
  const companyService = new CompanyService();
  const service = new AuthService();
  const auth = useContext(AuthContext);

  const fetchCompany = async () => {
    const response = await service.getCompanyAuthenticated()
    setCompany(response.body)
    return response;
  }

  const updateCompany = async (updatedCompany: CompanyProfileType) => {
    const response = await companyService.updateCompany(updatedCompany);
    setCompany(response.body);
    return response;
  }

  const disableAccount = async () => {
    const response = await companyService.disableAccount()
    return response;
  }

  const logOut = async () => {
    auth.logOut();
  }

  useEffect(() => {
    fetchCompany();
  }, [])

    return { company, fetchCompany, disableAccount, updateCompany, logOut }
}