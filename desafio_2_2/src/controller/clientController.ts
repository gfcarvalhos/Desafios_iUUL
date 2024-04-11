import { Cliente } from "../model/Cliente.js";
import { httpClient } from "../utils/httpCliente.js";
import { OperationErrors } from "./errorController.js";

export class clienteController {

  createNewClient(moedaOrigem: string, moedaDestino: string, valor: number, httpClientService: httpClient){
    return new Cliente(moedaOrigem, moedaDestino, valor, httpClientService);
  }

  getInfo (newCliente: Cliente): Promise<unknown> {
    const retorno : Promise<unknown> = newCliente.httpGet();
    return retorno;
  }

  validaMoeda(moeda: string): Array<number>{
    const moedaValidada = Cliente.validaMoeda(moeda);
    return moedaValidada;
  }
}