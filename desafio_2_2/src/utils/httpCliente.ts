import { httpClienteInterface } from "../interface/httpClienteInterface.js";

/**
 * Chamada da API utilizando fetch
 */
class httpClient implements httpClienteInterface{

  async get<T>(url: string, params: string[]): Promise<Array<T>> {
    return fetch(`${url}/${params[0]}/pair/${params[1]}/${params[2]}`)
    .then((response) => {return response.json()})
    .catch((err)=> {return err});
  }
}

export{httpClient}