import { CollectPointType } from "@/utils/types";
import { HttpResponse } from "api/client/IHttpClient";
import { RecoletoHttpClient } from "api/client/RecoletoHttpClient";

export class CollectPointService {
  private client: RecoletoHttpClient;

  constructor() {
    this.client = new RecoletoHttpClient();
  }

  async createCollectPoint(data: CollectPointType): Promise<HttpResponse<any>> {
    const base = '/collection-point';
    const response = await this.client.post({ url: base, body: data })
    return response
  }
}