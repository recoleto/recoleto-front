import { CollectPointType } from "@/utils/types";
import { CollectPointService } from "api/services/CollectPointService";
import { useEffect, useState } from "react";

export function useCollectPointRegister() {
  const service = new CollectPointService();
  const [collectPoints, setCollectPoints] = useState<CollectPointType[]>([]);

  const registerCollectPoint = async (data: CollectPointType) => {
    const response = await service.createCollectPoint(data);
    return response;
  }

  const fetchCollectPoints = async () => {
    const response = await service.fetchCollectPoints();
    setCollectPoints(response.body);
  }

  const deleteCollectPoint = async (pointUUID: string) => {
    const response = await service.deleteCollectPoint(pointUUID);
    console.log(response);
    return response;
  }

  useEffect(() => {
    fetchCollectPoints();
  })

  return {
    registerCollectPoint, 
    collectPoints,
    deleteCollectPoint,
    fetchCollectPoints
  }
}