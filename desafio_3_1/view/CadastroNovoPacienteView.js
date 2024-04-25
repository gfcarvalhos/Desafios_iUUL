import readlineSync from 'readline-sync';
import { validaCpf } from '../utils/validaCpf.js';
import { OperationError, OperationStatus } from '../Services/OperationError.js';

export class CadastroNovoPacienteView {

  leituraDeCpf(){
    let newCPF = readlineSync.question('\nCPF:');
    let valida = validaCpf(newCPF);
    if(valida){
      return newCPF
    } else {
      throw new Error('\nErro: CPF inválido.')
    }
    
  }
}