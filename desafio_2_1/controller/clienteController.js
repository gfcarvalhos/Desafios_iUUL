import { Cliente } from '../model/Cliente.js';
import { ListaCliente } from '../model/listaClienteRetorno.js';
import { validaCpf } from '../utils/cpf.js';
//import { validaNome } from '../utils/nome.js';
import { OperationStatus } from './errorController.js';

/**
 * Gerencia os models.
 */
class listaClienteController {
  /* ele vai chamar as validacoes a partir dos models que serao usadas no presenter */

  criaClasseLista() {
    return new ListaCliente();
  }

  addClienteOutput(listaCliente, objeto) {
    listaCliente.addClienteRetorno(objeto);
  }

  createClient(objeto){
    const clienteAtual = new Cliente();
    return clienteAtual.validate(objeto);
  }

  getListaDeClientes(listaCliente){
    return listaCliente.getClientes();
  }
}

export { listaClienteController };
