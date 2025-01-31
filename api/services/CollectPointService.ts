import { CollectPointType, UrbanSolidWasteCategory } from "@/utils/types";
import { HttpResponse, StatusCode } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class CollectPointService {
  private client: RecoletoHttpClient;

  constructor() {
    this.client = new RecoletoHttpClient();
  }

  async createCollectPoint(data: CollectPointType): Promise<HttpResponse<any>> {
    const base = '/collection-point';
    const response = await this.client.post({ url: base, body: data })
    if(response.statusCode === StatusCode.Created){
      return {
        ...response,
        resolve: 'Ponto de coleta cadastrado com sucesso"'
      }
    }
    return response
  }

  async fetchCollectPointsCompany(): Promise<HttpResponse<any>> {
    const base = '/collection-point/company';
    const response = await this.client.get({ url: base })
    return response
  }

  async fetchCollectPoints(): Promise<HttpResponse<any>> {
    const base = '/collection-point/all';
    const response = await this.client.get({ url: base })
    return response
  }

  async fetchCollectPointsByCategory(category: UrbanSolidWasteCategory): Promise<HttpResponse<any>> {
    const base = `/collection-point/usw/${category}`;
    const response = await this.client.get({ url: base })
    return response
  }

  async deleteCollectPoint(pointUUID: string): Promise<HttpResponse<any>> {
    const base = `/collection-point/delete/${pointUUID}`;
    const response = await this.client.put({ url: base })
    return response
  }

  async updateCollectPoint(pointUUID: string, data: CollectPointType): Promise<HttpResponse<any>> {
    const base = `/collection-point/update/${pointUUID}`;
    const response = await this.client.put({ url: base, body: data })
    return response
  }

}