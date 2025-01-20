import { UrbanSolidWasteType } from "@/utils/types";
import { StatusCode } from "api/client/IHttpClient";
import { UrbanSolidWasteService } from "api/services/UrbanSolidWasteService";
import { useEffect, useState } from "react";
import { formatUrbanSolidWasteCategory } from "@/utils/utils";

export function useUrbanSolidWaste() {
    const service = new UrbanSolidWasteService();
    const [urbanSolidWastes, setUrbanSolidWastes] = useState<UrbanSolidWasteType[]>([]);
    const [groupedUrbanSolidWastes, setGroupedUrbanSolidWastes] = useState<
        { title: string; data: UrbanSolidWasteType[] }[]
    >([]);

    async function registerUrbanSolidWaste(data: UrbanSolidWasteType) {
        return service.registerUrbanSolidWaste(data);
    }

    async function getUrbanSolidWastes() {
        const response = await service.fetchUrbanSolidWastes();
        if (response.statusCode === StatusCode.Ok) {
            const wastes = response.body as UrbanSolidWasteType[];
            setUrbanSolidWastes(wastes);

            // Agrupar os resíduos por categoria
            const groupedData = wastes.reduce((acc, waste) => {
                const category = formatUrbanSolidWasteCategory(waste.type);
                if (category && !acc[category]) {
                    acc[category] = [];
                }
                if (category) {
                    acc[category].push(waste);
                }
                return acc;
            }, {} as Record<string, UrbanSolidWasteType[]>);

            // Converter os grupos em um formato compatível com SectionList
            const sections = Object.keys(groupedData).map((category) => ({
                title: category,
                data: groupedData[category],
            }));

            setGroupedUrbanSolidWastes(sections);
        } else {
            setUrbanSolidWastes([]);
            setGroupedUrbanSolidWastes([]);
        }
    }

    useEffect(() => {
        getUrbanSolidWastes();
    }, []); // Sem dependência para evitar loop infinito

    return {
        registerUrbanSolidWaste,
        getUrbanSolidWastes,
        urbanSolidWastes,
        groupedUrbanSolidWastes, // Dados já agrupados
    };
}
