import { CompanyProfileType } from "@/utils/types";
import { CompanyService } from "api/services/CompanyService";
import { useEffect, useState } from "react";

export function useGetComapnies() {
    const service = new CompanyService();
    const [companies, setCompanies] = useState<CompanyProfileType[]>([]);
    const fetchAllCompanies = async () => {
        const response = await service.fetchAllCompanies();
        setCompanies(response.body);
        return response;
    }

    useEffect(() => {
        fetchAllCompanies();
    }, [])

    return {
        companies
    }
}