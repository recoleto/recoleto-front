import { UserProfileType, UserType } from "@/utils/types";
import { HttpResponse, StatusCode } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class UserService {
  private client: RecoletoHttpClient;

  constructor() {
    this.client = new RecoletoHttpClient();
  }

  async disableAccount(): Promise<HttpResponse<any>> {
    const base = '/user/disable';
    const response = await this.client.put({ url: base })
    if (response.statusCode === StatusCode.Ok) {
      return {
        statusCode: StatusCode.Ok,
        resolve: 'Conta desativada com sucesso1',
      }
    }
    return response
  }

  async updateUser(data: UserProfileType): Promise<HttpResponse<any>> {
    const base = '/user/update';
    const response = await this.client.put({ url: base, body: data })
    if (response.statusCode === StatusCode.Ok) {
      return {
        statusCode: StatusCode.Ok,
        resolve: 'Dados atualizados com sucesso!',
      }
    }
    return response
  }

  async fetchAllUsers(): Promise<HttpResponse<any>> {
    const base = '/user/all';
    const response = await this.client.get({ url: base })
    if (response.statusCode === StatusCode.Ok) {
      return {
        statusCode: StatusCode.Ok,
        body: response.body,
      }
    }
    return response;
  }

}