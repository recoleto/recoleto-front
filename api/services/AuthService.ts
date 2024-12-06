import { HttpResponse } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class AuthService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
        console.log('iai')
    }

    async loginUser({ email, password }: LoginType): Promise<HttpResponse<any>> {
        const base = '/auth/user/login';
        const response = await this.client.post({url: base, body: {email, password}})

        return response
    }
}