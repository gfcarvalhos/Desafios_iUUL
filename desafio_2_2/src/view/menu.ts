import { clienteController } from "../controller/clientController"
import readlineSync from 'readline-sync';
import { httpClient } from "../utils/httpCliente";
import { View } from "./view";
import { Currency } from "../utils/currency";
import { OperationErrors, OperationStatus } from "../controller/errorController";
import { Cliente } from "../model/Cliente";

export class Menu{

  async run(controller: clienteController){
    const view = new View();
    let validador: boolean = true;
    while(validador){
      let moedaOrigem: string = readlineSync.question('Moeda Origem: ')
      if(moedaOrigem == ''){
        break;
      }
      let moedaOrigemValida: Array<number> = controller.validaMoeda(moedaOrigem);
      
      if(moedaOrigemValida[0] !== 1) {
        console.log(view.getErro(moedaOrigemValida[1]))
        break;
      }
      let moedaDestino: string = readlineSync.question('Moeda Destino: ')
      if(moedaDestino === moedaOrigem){
        console.log(view.getErro(2))
        break;
      }

      let moedaDestinoValida: Array<number> = controller.validaMoeda(moedaDestino);
      if(moedaDestinoValida[0] !== 1){
        console.log(view.getErro(moedaDestinoValida[1]))
        break;
      }
      let valor: string = readlineSync.question('Valor: ')
      valor = valor.replace(',', '.')
      let valorValida = controller.validaValor(valor);
      if(valorValida[0] !== 1){
        console.log(view.getErro(valorValida[1]))
        break;
      }

      let cliente: Cliente = controller.createNewClient(moedaOrigem, moedaDestino, +valor, new httpClient);
      let currency: [OperationStatus, number] = await controller.getInfo(cliente);

      if(currency[0] === OperationStatus.FAILURE){
        console.log(view.getErro(currency[1]))
        break;
      }

      let mensagemFinal: string = Currency.run(currency[1], moedaOrigem, moedaDestino, valor);
      console.log(`\n${mensagemFinal}\n`);
     }
  };
      
}

