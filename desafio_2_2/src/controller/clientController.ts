import { Cliente } from "../model/Cliente.js";
import { httpClient } from "../utils/httpCliente.js";

export class clienteController {
  getInfo<T>(): unknown {
    const client = new Cliente('str', 'str', new httpClient);
    const retorno : unknown = client.httpGet();
    return retorno
  }
}