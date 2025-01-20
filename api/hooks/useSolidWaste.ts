import { UrbanSolidWasteService } from "api/services/UrbanSolidWasteService";
import { useEffect, useState } from "react";

export function useSolidWaste() {
    const [solidWastes, setSolidWastes] = useState<any[]>([]);
    const service = new UrbanSolidWasteService();

    useEffect(() => {
        async function fetchSolidWastes() {
            const response = await service.fetchUrbanSolidWastes();
            console.log(response);
            setSolidWastes(response.body as any[]);
        }
        fetchSolidWastes();
    }, []);
    return { solidWastes };
}