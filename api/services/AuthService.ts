import { HttpResponse, StatusCode } from "api/client/IHttpClient";
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
        if (response.statusCode === StatusCode.Ok) {
            return {
                ...response,
                resolve: 'Usuário logado com sucesso!',
            }
        }
        return response;
    }

    async registerUser(data: UserType): Promise<HttpResponse<any>> {
        const base = '/auth/user/sign-up';
        const response = await this.client.post({ url: base, body: data })
        if (response.statusCode === StatusCode.Created) {
            return {
                ...response,
                resolve: 'Cadastro efetuado com sucesso!',
            }
        }
        return response;
    }

    async registerCompany(data: CompanyType): Promise<HttpResponse<any>> {
        const base = '/auth/company/sign-up';
        const response = await this.client.post({ url: base, body: data })
        return response
    }

    async getUserAuthenticated(): Promise<HttpResponse<any>> {
        const base = '/user/me';
        const response = await this.client.get({ url: base })
        return response
    }

    async getCompanyAuthenticated(): Promise<HttpResponse<any>> {
        const base = '/company/me';
        const response = await this.client.get({ url: base })
        return response
    }
}