import { UrbanSolidWasteCategory, UrbanSolidWasteRequest } from "@/utils/types";
import { StatusCode } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class UrbanSolidWasteService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
    }

    async fetchUrbanSolidWastes() {
        const base = '/usw';
        const response = await this.client.get({ url: base });
        return response;
    }

    async registerUrbanSolidWaste(data: any) {
        const base = '/usw';
        return this.client.post({ url: base, body: data });
    }

    async fetchUrbanSolidWasteById(type: UrbanSolidWasteCategory) {
        const base = `/usw/type/${type}`;
        const response = await this.client.get({ url: base });
        return response;
    }

    async createUSWRequest({ pointId, data }: { pointId: string, data: { waste: UrbanSolidWasteRequest[] } }) {
        const base = `/request/${pointId}`;
        const response = await this.client.post({ url: base, body: data })
        if(response.statusCode === StatusCode.Created) {
            return {
                ...response,
                resolve: 'Solicitação de descarte realizada com sucesso.'
            }
        } else return response;
    }
}