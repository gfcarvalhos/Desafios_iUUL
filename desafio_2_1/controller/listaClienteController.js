import { Cliente } from '../model/Cliente.js';
import { ListaCliente } from '../model/listaClienteRetorno.js';
import { validaCpf } from '../utils/cpf.js';
import { validaNome } from '../utils/nome.js';
import { OperationStatus } from './errorController.js';

class listaClienteController {
  /* ele vai chamar as validacoes a partir dos models que serao usadas no presenter */

  criaClasseLista() {
    return new ListaCliente();
  }

  addClienteOutput(objeto, listaCliente) {
    listaCliente.addClienteRetorno(objeto);
  }

  validarNomeCliente(nome) {
    return validaNome(nome)
      ? { status: OperationStatus.SUCCESS }
      : { status: OperationStatus.FAILURE, errors: 'oi' };
  }

  validarCpfCliente(cpf) {
    return validaCpf(cpf)
      ? { status: OperationStatus.SUCCESS }
      : { status: OperationStatus.FAILURE, errors: 'oi' };
  }
}

export { listaClienteController };
