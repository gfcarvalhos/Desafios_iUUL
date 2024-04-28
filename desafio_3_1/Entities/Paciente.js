import {
  OperationError,
  OperationStatus,
} from '../controller/OperationError.js';
import { PacienteSchema } from '../models/PacienteSchema.js';
import { calculaIdade } from '../utils/calculaIdade.js';

export class Paciente{
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
        return OperationStatus.FAILURE
      } else{
        return OperationStatus.SUCCESS
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

  static criaPaciente(dados){
    return dados.map(dado => new Paciente(dado.nome, dado.cpf, dado.dataNascimento, dado.idade));
  }
}
