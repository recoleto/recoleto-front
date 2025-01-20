import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class urbanSolidWasteService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
    }

    async registerUrbanSolidWaste(data: any) {
        const base = '/usw';
        return this.client.post({ url: base, body: data });
    }
}