import { OperationErrors, OperationStatus } from "../controller/errorController";
import { httpClienteInterface } from "../interface/httpClienteInterface";

class Cliente {
  protected moedaOrigem: string;
  protected moedaDestino: string;
  protected valor: number;
  protected getAPICurrency: httpClienteInterface;

  constructor(moedaOrigem: string, moedaDestino: string, valor: number, getAPICurrency: httpClienteInterface){
    this.moedaOrigem = moedaOrigem;
    this.moedaDestino = moedaDestino;
    this.valor = valor;
    this.getAPICurrency = getAPICurrency;
  }

  setMoedaOrigem(moeda: string){
    this.moedaOrigem = moeda;
  }

  httpGet(){
    const response = this.getAPICurrency.get('https://v6.exchangerate-api.com/v6', [this.moedaOrigem, this.moedaDestino])
    .then((resposta) => {console.log(resposta)});
    return response;
  }

  static validaMoeda(moeda: string): Array<number>{
    const validador: boolean = (typeof moeda === 'string' && moeda.length === 3)
    if(!validador){
      return [OperationStatus.FAILURE, OperationErrors.INVALID_CURRENCY]
    } else{
      return [OperationStatus.SUCCESS]
    }
  }

  static validaValor(valor: number): Array<number>{
    const validador = valor>0
    if(!validador){
      return [OperationStatus.FAILURE, OperationErrors.VALUE_NEGATIVE]
    } else {
      return [OperationStatus.SUCCESS];
    }
   }


}

export{ Cliente }