import { Cliente } from "../model/Cliente.js";
import { httpClient } from "../utils/httpCliente.js";
import { OperationErrors, OperationStatus } from "./errorController.js";

interface ApiResponse {
  result: string,
  documentation: string,
  'terms-of-use': string,
  'error-type' ?: string,
  time_last_update_unix ?: number,
  time_last_update_utc ?: string,
  time_next_update_unix ?: number,
  time_next_update_utc ?: string,
  base_code ?: string,
  target_code ?: string,
  conversion_rate ?: number

}

export class clienteController {

  createNewClient(moedaOrigem: string, moedaDestino: string, valor: number, httpClientService: httpClient){
    return new Cliente(moedaOrigem, moedaDestino, valor, httpClientService);
  }

  async getInfo<T> (newCliente: Cliente): Promise<[OperationStatus, unknown]> {
    try{
      const objeto = await newCliente.httpGet()
      if('result' in objeto && objeto.result === 'success' && 'conversion_rate' in objeto){
        return [OperationStatus.SUCCESS, objeto.conversion_rate]
      } else if('error-type' in objeto) {
            return [OperationStatus.FAILURE, objeto['error-type']]
        } else {
          return [OperationStatus.FAILURE, "Unknown error"];
        }
      } catch (err){
        return [OperationStatus.FAILURE, "Error occurred"];
      }
  }

  validaMoeda(moeda: string): Array<number>{
    const moedaValidada = Cliente.validaMoeda(moeda);
    return moedaValidada;
  }
}