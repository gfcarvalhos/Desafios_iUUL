import readlineSync from 'readline-sync';
import { validaCpf } from '../utils/validaCpf.js';
import {
  OperationError,
  OperationStatus,
} from '../controller/OperationError.js';
import { PacienteController } from '../controller/PacienteController.js';

export class CadastroNovoPacienteView {
  #message;
  #PacienteController;

  constructor() {
    this.#message = new OperationFailureMessage();
    this.#PacienteController = new PacienteController();
  }

  leituraDeCpf() {
    while (true) {
      try {
        let newCPF = readlineSync.question('\nCPF: ');
        let valida = validaCpf(newCPF);
        if (valida.status) {
          return newCPF;
        } else {
          this.#message.setupMessage(valida.message)
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }

  leituraNome() {
    while (true) {
      try {
        let newNome = readlineSync.question('Nome: ');
        const regex = /^[a-zA-Z\s]+$/;
        if (regex.test(newNome) && newNome.length >= 5) {
          return newNome;
        } else {
          throw new Error('Nome inválido.');
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }

  leituraDataNascimento() {
    while (true) {
      try {
        let newDataPaciente = readlineSync.question('Data de Nascimento: ');
        let valida =
          this.#PacienteController.validaDataNascimentoPaciente(newDataPaciente);
        if (valida.status) {
          return newDataPaciente;
        } else {
          this.#message.setupMessage(valida.message);
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
      case OperationError.PATIENT_ALREADY_EXISTS:
        throw new Error('CPF já cadastrado.');
      case OperationError.UNDERAGE_PATIENT:
        throw new Error('Paciente não pode ser menor de idade.');
      case OperationError.INVALID_DATE:
        throw new Error('Data inválida.');
      case OperationError.CPF_INVALID:
        throw new Error('CPF inválido.');
    }
  }
}

export class OperationResponse {
  static setupMessage(response) {
    switch (response) {
      case OperationStatus.SUCCESS:
        console.log('\nPaciente registrado com Sucesso!');
        break;
      case OperationStatus.FAILURE:
        throw new Error('Não foi possível cadastrar o paciente.');
    }
  }
}
