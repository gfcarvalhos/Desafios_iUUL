import { clienteController } from "../controller/clientController"
import readlineSync from 'readline-sync';
import { httpClient } from "../utils/httpCliente";
import { View } from "./view";

export class Menu{

  run(controller: clienteController){
    const view = new View();
    console.log('Welcome to the first test!')
    let validador: boolean = true;
    while(validador){
      const moedaOrigem = readlineSync.question('Moeda Origem: ')
      if(moedaOrigem == ''){
        break;
      }
      const moedaOrigemValida: Array<number> = controller.validaMoeda(moedaOrigem);
      
      if(moedaOrigemValida[0] !== 1) {
        console.log(view.getErro(moedaOrigemValida[1]))
        break;
      }
      const moedaDestino = readlineSync.question('Moeda Destino: ')
      if(moedaDestino === moedaOrigem){
        console.log(view.getErro(2))
      }

      const moedaDestinoValida: Array<number> = controller.validaMoeda(moedaDestino);
      if(moedaDestinoValida[0] !== 1){
        console.log(view.getErro(moedaDestinoValida[1]))
        break;
      }
      const valor: number = readlineSync.questionFloat('Valor: ')
      const cliente = controller.createNewClient(moedaOrigem, moedaDestino, valor, new httpClient);
      //controller.getInfo(cliente);
      console.log('Fim do processo!')
        }
    };
      
}

