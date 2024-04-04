import { ListaCliente } from '../model/listaCliente.js';

class listaClienteController {
  /* ele vai chamar as validacoes a partir dos models que serao usadas no presenter */

  criaClasseLista(listaParaValidar) {
    const listaDeClientes = new ListaCliente();
    listaDeClientes.setListaDeClientes(listaParaValidar);
    
  }
}

export { listaClienteController };
