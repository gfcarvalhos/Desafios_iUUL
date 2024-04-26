import readlineSync from 'readline-sync';
import { OperationError, OperationStatus } from '../Services/OperationError.js';
import { validaCpf } from '../utils/validaCpf.js';

export class ExclusaoDePacienteView {
  leituraDeCpf() {
    while (true) {
      try {
        let newCPF = readlineSync.question('\nCPF: ');
        let valida = validaCpf(newCPF);
        if (valida) {
          return newCPF;
        } else {
          throw new Error('CPF inválido.');
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }
}

export class OperationFailureMessage {
  setupMessage(response) {
    switch (response) {
      case OperationError.PATIENT_HAS_APPOINTMENT:
        throw new Error(
          'Paciente não pode ser excluído, pois possui consulta agendada.',
        );
      case OperationError.PATIENT_NOT_REGISTERED:
        throw new Error('Paciente não cadastrado.');
    }
  }
}

export class OperationSucess {
  static setupMessage(response) {
    switch (response) {
      case OperationStatus.SUCCESS:
        console.log('\nPaciente registrado com Sucesso!');
        break;
      case OperationStatus.FAILURE:
        throw new Error('Não foi possível excluir o paciente.');
    }
  }
}
