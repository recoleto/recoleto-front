import { CompanyProfileType } from "@/utils/types";
import { HttpResponse, StatusCode } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class CompanyService {
  private client: RecoletoHttpClient;

  constructor() {
    this.client = new RecoletoHttpClient();
  }

  async disableAccount(): Promise<HttpResponse<any>> {
    const base = '/company/disable';
    const response = await this.client.put({ url: base })
    if (response.statusCode === StatusCode.Ok) {
      return {
        ...response,
        resolve: 'Conta desativada com sucesso!'
      }
    }
    return response
  }

  async updateCompany(data: CompanyProfileType): Promise<HttpResponse<any>> {
    const base = '/company/update';
    const response = await this.client.put({ url: base, body: data })
    if (response.statusCode === StatusCode.Ok) {
      return {
        ...response,
        resolve: 'Empresa atualizada com sucesso!'
      }
    }
    return response
  }

  async fetchAllCompanies(): Promise<HttpResponse<any>> {
    const base = '/company/all';
    const response = await this.client.get({ url: base })
    if (response.statusCode === StatusCode.Ok) {
      return {
        ...response,
        body: response.body,
      }
    }
    return response;
  }
}