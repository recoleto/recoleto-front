import { UrbanSolidWasteType } from "@/utils/types";
import { urbanSolidWasteService } from "api/services/UrbanSolidWasteService";

export function useUrbanSolidWaste() {
    const service = new urbanSolidWasteService();
    
    async function registerUrbanSolidWaste(data: UrbanSolidWasteType) {
        return service.registerUrbanSolidWaste(data);
    }

    return {
        registerUrbanSolidWaste
    }
}