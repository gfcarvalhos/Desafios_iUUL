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
    console.log(this.getAPICurrency.get('teste', ['test1','teste']));
  }

  static validaMoeda(moeda: string): Array<number>{
    const validador: boolean = (typeof moeda === 'string' && moeda.length === 3)
    if(!validador){
      return [OperationStatus.FAILURE, OperationErrors.INVALID_CURRENCY]
    } else{
      return [OperationStatus.SUCCESS]
    }
  }

  static validaValor(valor: number): boolean{
    return true
  }


}

export{ Cliente }