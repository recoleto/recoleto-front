import axios, {AxiosInstance} from "axios";
import {HttpRequest, HttpResponse, IHttpClient} from "./IHttpClient";
import {getData} from "@/utils/store-data";

export class RecoletoHttpClient implements IHttpClient {
  private axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: "http://138.197.89.158:8080",
      headers: { "Content-Type": "application/json" },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
       try {
        const token = await getData('@Auth:token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error retrieving data:", error);
        return config;
      }
      return config;
    })

  }

  async put<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return this.axiosInstance.put<T>(url, body)
      .then((response) => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        console.log(error);
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description || error.response?.data.detail,
        };
      });
  }

  async get<T>({ url }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.get<T>(url)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data
        };
      }).catch(error => {
        console.log(error);
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: 'Erro interno no servidor',
          };
        } else {
          return {
            statusCode: error.response?.status,
            reject: error.response?.data.description || error.response?.data.detail,
          };
        }
      });
  }
  
  async post<T>({ url, body }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.post<T>(url, body)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        console.log(error);
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail || error.response.data.description,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description,
        };
      });
  }

  async delete<T>({ url }: HttpRequest<T>): Promise<HttpResponse<T>> {
    return await this.axiosInstance.delete<T>(url)
      .then(response => {
        return {
          statusCode: response.status,
          body: response.data,
        };
      }).catch(error => {
        console.log(error);
        if (error.response?.status >= 500){
          return {
            statusCode: 500,
            reject: error.response?.data.detail,
          };
        } else return {
          statusCode: error.response?.status,
          reject: error.response?.data.description,
        };
      });
  }
}