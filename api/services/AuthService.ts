import { HttpResponse } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";
import { CompanyType, LoginType, UserType } from "@/utils/types";

export class AuthService {
    private client: RecoletoHttpClient;

    constructor() {
        this.client = new RecoletoHttpClient();
    }

    async loginUser({ email, password }: LoginType): Promise<HttpResponse<any>> {
        const base = '/auth/login';
        const response = await this.client.post({ url: base, body: { email, password } })

        return response
    }

    async registerUser(data: UserType): Promise<HttpResponse<any>> {
        const base = '/auth/register';
        const response = await this.client.post({ url: base, body: data })

        return response

    }

    async registerCompany({ ...data }: CompanyType): Promise<HttpResponse<any>> {
        const base = '/auth/company/sign-up';
        const response = await this.client.post({ url: base, body: data })
        console.log('chegou')
        return response
    }
}