import { Cliente } from "../model/Cliente.js";
import { httpClient } from "../utils/httpCliente.js";
import { OperationErrors, OperationStatus } from "./errorController.js";

export class clienteController {

  createNewClient(moedaOrigem: string, moedaDestino: string, valor: number, httpClientService: httpClient){
    return new Cliente(moedaOrigem, moedaDestino, valor, httpClientService);
  }

  async getInfo<T> (newCliente: Cliente): Promise<[OperationStatus, number]> {
    try{
      const objeto = await newCliente.httpGet()
      if('result' in objeto && objeto.result === 'success' && 'conversion_rate' in objeto && typeof objeto.conversion_rate === 'number'){
        return [OperationStatus.SUCCESS, objeto.conversion_rate]
        } else {
          return [OperationStatus.FAILURE, OperationErrors.API_ERROR];
        }
      } catch (err){
        return [OperationStatus.FAILURE, OperationErrors.API_ERROR];
      }
  }

  validaMoeda(moeda: string): Array<number>{
    const moedaValidada = Cliente.validaMoeda(moeda);
    return moedaValidada;
  }
}