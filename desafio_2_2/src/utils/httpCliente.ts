import { httpClienteInterface } from "../interface/httpClienteInterface.js";

class httpClient implements httpClienteInterface{

  get<T>(url: string, params: string[]): Promise<unknown> {
    const response = fetch('https://v6.exchangerate-api.com/v6/846abafcbdf7d8dafdb65df5/pair/EUR/GBP')
    .then((response) => {return response.json()})
    .then((data)=> {console.log(data)})
    .catch((err)=> {return err})

    return response;
  }
}

export{httpClient}