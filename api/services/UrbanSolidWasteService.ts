import { UrbanSolidWasteCategory, UrbanSolidWasteRequest, UrbanSolidWasteRequestCompanyType } from "@/utils/types";
import { HttpResponse, StatusCode } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class UrbanSolidWasteService {
  private client: RecoletoHttpClient;

  constructor() {
    this.client = new RecoletoHttpClient();
  }

  async fetchUrbanSolidWastes(): Promise<HttpResponse<any>> {
    const base = '/usw';
    const response = await this.client.get({ url: base });
    return response;
  }

  async registerUrbanSolidWaste(data: any): Promise<HttpResponse<any>> {
    const base = '/usw';
    return this.client.post({ url: base, body: data });
  }

  async fetchUrbanSolidWasteById(type: UrbanSolidWasteCategory): Promise<HttpResponse<any>> {
    const base = `/usw/type/${type}`;
    const response = await this.client.get({ url: base });
    return response;
  }

  async createUSWRequest({ pointId, data }: { pointId: string, data: { waste: UrbanSolidWasteRequest[] } }): Promise<HttpResponse<any>> {
    const base = `/request/${pointId}`;
    const response = await this.client.post({ url: base, body: data })
    if (response.statusCode === StatusCode.Created) {
      return {
        ...response,
        resolve: 'Solicitação de descarte realizada com sucesso.'
      }
    } else return response;
  }

  async fetchUSWRequestsByCompant(): Promise<HttpResponse<any>> {
    const base = '/request/company/all';
    return this.client.get({ url: base });
  }

  async companyUpdateRequest({ requestId, status }: { requestId: UrbanSolidWasteRequestCompanyType['requestId'], status: UrbanSolidWasteRequestCompanyType['status'] }): Promise<HttpResponse<any>> {
    const base = `request/update/company/${requestId}/${status}`;
    const response = await this.client.put({ url: base });
    if (response.statusCode === StatusCode.Ok) {
      return {
        ...response,
        resolve: 'Solicitação atualizada com sucesso.'
      }
    }
    return response;
  }
}