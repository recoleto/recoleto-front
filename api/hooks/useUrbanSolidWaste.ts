import { UrbanSolidWasteCategory, UrbanSolidWasteRequest, UrbanSolidWasteType } from "@/utils/types";
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

    const [filteredUrbanSolidWastes, setFilteredUrbanSolidWastes] = useState<UrbanSolidWasteType[]>([]);

    async function registerUrbanSolidWaste(data: UrbanSolidWasteType) {
        return service.registerUrbanSolidWaste(data);
    }

    async function urbanSolidWasteRequest({ pointId, data }: { pointId: string; data: { waste: UrbanSolidWasteRequest[] } }) {
        return service.createUSWRequest({pointId, data});
    }

    async function getUrbanSolidWastes() {
        const response = await service.fetchUrbanSolidWastes();
        if (response.statusCode === StatusCode.Ok) {
            const wastes = response.body as UrbanSolidWasteType[];
            setUrbanSolidWastes(wastes);

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

    const fetchFilteredUrbanSolidWastes = async (type: UrbanSolidWasteCategory) => {
        const response = await service.fetchUrbanSolidWasteById(type);
        if (response.statusCode === StatusCode.Ok) {
            const wastes = response.body as UrbanSolidWasteType[];
            setFilteredUrbanSolidWastes(wastes);
        } else {
            setFilteredUrbanSolidWastes([]);
        }
    }

    const updateUrbanSolidWaste = async (id: UrbanSolidWasteType['id'], data: UrbanSolidWasteType) => {
        return service.editUrbanSolidWaste({ id, data });
    }

    useEffect(() => {
        getUrbanSolidWastes();
    }, []);

    return {
        registerUrbanSolidWaste,
        getUrbanSolidWastes,
        urbanSolidWastes,
        groupedUrbanSolidWastes,
        filteredUrbanSolidWastes,
        fetchFilteredUrbanSolidWastes,
        urbanSolidWasteRequest,
        updateUrbanSolidWaste
    };
}
