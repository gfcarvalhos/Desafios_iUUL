import { httpClienteInterface } from "../interface/httpClienteInterface.js";

/**
 * Chamada da API utilizando fetch
 */
class httpClient implements httpClienteInterface{

  async get<T>(url: string, params: string[]): Promise<Array<T>> {
    const response: Promise<Array<T>> = await fetch(`${url}/${params[0]}/${params[1]}`)
    .then((response) => {return response.json()})
    .then((data)=> {console.log(data)})
    .catch((err)=> {return err})

    return response;
  }
}

export{httpClient}