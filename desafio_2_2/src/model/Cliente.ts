import { httpClienteInterface } from "../interface/httpClienteInterface";

class Cliente {
  protected readonly moedaOrigem: string;
  protected readonly moedaDestino: string;
  protected getAPICurrency: httpClienteInterface;

  constructor(moedaOrigem: string, moedaDestino: string, getAPICurrency: httpClienteInterface){
    this.moedaOrigem = moedaOrigem;
    this.moedaDestino = moedaDestino;
    this.getAPICurrency = getAPICurrency;
  }

  createNewCliente(){
    
  }

  httpGet(){
    console.log(this.getAPICurrency.get('teste', ['test1','teste']));
  }


}

export{ Cliente }