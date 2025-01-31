import { CollectPointMapType, UrbanSolidWasteCategory } from "@/utils/types";
import { CollectPointService } from "api/services/CollectPointService";
import { useState } from "react";

export function useCollectPointsUser() {
    const [filteredCollectPoints, setFilteredCollectPoints] = useState<CollectPointMapType[]>([]);
    const service = new CollectPointService();

    const fetchCollectPointsByCategory = async (category: UrbanSolidWasteCategory) => {
        const response = await service.fetchCollectPointsByCategory(category);
        setFilteredCollectPoints(response.body);
        return response;
    }

    const fetchAllCollectPoints = async () => {
        const response = await service.fetchCollectPoints();
        setFilteredCollectPoints(response.body);
        return response;
    }

    return {
        filteredCollectPoints,
        fetchCollectPointsByCategory,
        fetchAllCollectPoints,
    }
}