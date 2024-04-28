import {
  OperationError,
  OperationStatus,
} from '../controller/OperationError.js';
import { PacienteSchema } from '../models/PacienteSchema.js';
import { calculaIdade } from '../utils/calculaIdade.js';

export class Paciente {
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

  get nomePaciente(){
    return this.#nome
  }

  get cpfPaciente(){
    return this.#cpf
  }

  get dataNascimentoPaciente(){
    return this.#dataNascimento
  }

  get idadePaciente(){
    return this.#idade
  }

  async salvarPacienteNoBanco() {
    try {
      const pacienteModelo = await PacienteSchema.create({
        nome: this.#nome,
        cpf: this.#cpf,
        dataNascimento: this.#dataNascimento,
        idade: this.#idade,
      });
    } catch (error) {
      return error;
    }
  }

  async buscaPacientePeloCpf(cpf) {
    try {
      const retornoDeBuscaPorCpf = await PacienteSchema.findByPk(cpf);
      if(retornoDeBuscaPorCpf == null){
        return false
      } else{
        return true
      }
    } catch (erro) {
      throw new Error(OperationError.UNEXPECTED_ERROR)
    }
  }

  async excluirPaciente(cpf) {
    try {
      const retornoDeBuscaPorCpf = await PacienteSchema.findByPk(cpf);
      await retornoDeBuscaPorCpf.destroy()
      return {status: OperationStatus.SUCCESS}
    } catch(erro){
      console.log(erro)
      return {status: OperationStatus.FAILURE, message: OperationError.UNEXPECTED_ERROR}
    }
  }

  async buscaTodosOsPacientes(){
    try {
      const retornoListaPacientes = await PacienteSchema.findAll();
      const Pacientes = Paciente.criaPaciente(retornoListaPacientes)
      return Pacientes
    } catch (erro) {
      console.error(erro)
    }
  }

  validaData(newData) {
    //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      //Chamada para verificar a idade do paciente
      const idade = calculaIdade(newData);
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

  static criaPaciente(dados){
    return dados.map(dado => new Paciente(dado.nome, dado.cpf, dado.dataNascimento, dado.idade));
  }
}
