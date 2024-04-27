import {
  OperationError,
  OperationStatus,
} from '../controller/OperationError.js';
import { PacienteSchema } from '../models/PacienteSchema.js';

export class Paciente extends PacienteSchema {
  #nome;
  #cpf;
  #dataNascimento;
  #idade;

  constructor(nome, cpf, dataNacimento, idade) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNacimento;
    this.#idade = idade;
  }

  get nomePaciente() {
    return this.#nome;
  }

  get cpfPaciente() {
    return this.#cpf;
  }

  get dataNacimentoPaciente() {
    return this.#dataNascimento;
  }

  get PacienteInfo() {
    const json = {
      nome: 'oi',
    };
  }

  registraNome(nome) {
    this.#nome = nome;
  }

  registraCpf(cpf) {
    this.#cpf = cpf;
  }

  registraDataNascimento(dataNascimento) {
    this.#dataNascimento = dataNascimento;
  }

  registraDataNascimento(idade) {
    this.#idade = idade;
  }

  static validaIdade(dataVerificar) {
    //divide a string e transforma em Date()
    let partesDaData = dataVerificar.split('/');
    let dataNascimento = new Date(
      partesDaData[2],
      partesDaData[1] - 1,
      partesDaData[0],
    );
    let dataAtual = new Date();
    //Verifica idade pela diferença de anos
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let mesNascimento = dataNascimento.getMonth();
    //Verifica se no ano corrente o paciente já fez aniversario. Caso nao, diminui em 1 a data
    //calculada entre a diferença de anos
    if (
      mesAtual < mesNascimento ||
      (mesAtual == mesNascimento &&
        dataAtual.getDate() < dataNascimento.getDate())
    ) {
      idade--;
    }
    return idade;
  }

  static validaData(newData) {
    //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      //Chamada para verificar a idade do paciente
      const idade = this.validaIdade(newData);
      if (idade >= 13) {
        return { status: OperationStatus.SUCCESS };
      } else {
        return {
          status: OperationStatus.FAILURE,
          message: OperationError.UNDERAGE_PATIENT,
        };
      }
    } else {
      return {
        status: OperationStatus.FAILURE,
        message: OperationError.INVALID_DATE,
      };
    }
  }
}
