import { Paciente } from '../Entities/Paciente.js';
import { calculaIdade } from '../utils/calculaIdade.js';
import { OperationError, OperationStatus } from './OperationError.js';

export class PacienteController {
  constructor() {
    this.paciente = new Paciente();
  }
  async salvarNovoPaciente(nome, cpf, dataNascimento) {
    try {
      const idade = calculaIdade(dataNascimento);
      let newPaciente = new Paciente(nome, cpf, dataNascimento, idade);
      const resultado = await newPaciente.salvarPacienteNoBanco();
      return { status: OperationStatus.SUCCESS };
    } catch (error) {
      return {
        status: OperationStatus.FAILURE,
        message: OperationError.UNEXPECTED_ERROR,
      };
    }
  }

  async exclusaoPaciente(cpf) {
    let retornoRepositorioPaciente = await this.paciente.excluirPaciente(cpf);
    return retornoRepositorioPaciente;
  }

  async verificaExistenciaDeCpf(cpf) {
    let pacienteExiste = await this.paciente.buscaPacientePeloCpf(cpf);
    if (pacienteExiste) {
      return { status: OperationStatus.SUCCESS };
    } else {
      return {
        status: OperationStatus.FAILURE,
        message: OperationError.PATIENT_NOT_REGISTERED,
      };
    }
  }

  async buscaPacientes() {
    let retornoLista = this.paciente.buscaTodosOsPacientes()
    return retornoLista;
  }

  validaDataNascimentoPaciente(newDataNascimento) {
    let retornoDataNascimento = this.paciente.validaData(newDataNascimento);
    return retornoDataNascimento;
  }


  buscaPacienteService(cpf) {
    return this.repositorio.buscaPaciente(cpf)[0];
  }
}
