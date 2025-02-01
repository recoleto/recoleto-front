import { UrbanSolidWasteRequestCompanyType } from "@/utils/types";
import { UrbanSolidWasteService } from "api/services/UrbanSolidWasteService";
import { useEffect, useState } from "react";

export function useUswRequestsCompany() {
  const [requests, setRequests] = useState<UrbanSolidWasteRequestCompanyType[]>([]);
  const service = new UrbanSolidWasteService();


  async function fetchRequests() {
    const response = await service.fetchUSWRequestsByCompant();
    setRequests(response.body);
    return response
  }

  async function updateRequest(requestId: UrbanSolidWasteRequestCompanyType['requestId'], status: UrbanSolidWasteRequestCompanyType['status']) {
    const response = await service.companyUpdateRequest({ requestId, status });
    return response;
  }

  useEffect(() => {
    fetchRequests();
  }, []);
  return { requests, updateRequest, fetchRequests };
}