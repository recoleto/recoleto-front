import { HttpResponse } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class CompanyService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
    }

    async disableAccount(): Promise<HttpResponse<any>> {
        const base = '/company/disable';
        const response = await this.client.put({ url: base })
        return response
    }

    async updateCompany({...data}): Promise<HttpResponse<any>> {
        const base = '/company/update';
        const response = await this.client.put({ url: base, body: data })
        return response
    }
}