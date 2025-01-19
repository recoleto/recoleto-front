import { CollectPointType } from "@/utils/types";
import { CollectPointService } from "api/services/CollectPointService";

export function useCollectPointRegister() {
  const service = new CollectPointService();

  const registerCollectPoint = async (data: CollectPointType) => {
    const response = await service.createCollectPoint(data);
    return response;
  }

  return {
    registerCollectPoint
  }
}