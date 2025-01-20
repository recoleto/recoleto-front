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
}