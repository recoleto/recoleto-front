import { UserType } from "@/utils/types";
import { HttpResponse } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class UserService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
    }

    async disableAccount(): Promise<HttpResponse<any>> {
        const base = '/user/disable';
        const response = await this.client.put({ url: base })
        return response
    }

    async updateUser({...data}: UserType): Promise<HttpResponse<any>> {
        const base = '/user/update';
        const response = await this.client.put({ url: base, body: data })
        return response
    }
}