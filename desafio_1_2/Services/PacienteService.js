import { Paciente } from '../Entities/Paciente.js';
import { PacienteRepository } from '../repositories/PacienteRepository.js';

export class PacienteService {
  constructor() {
    this.repositorio = new PacienteRepository();
  }
  criarPaciente() {
    return new Paciente();
  }

  cadastroDeCpf(paciente, newCPF) {
    //Verifica se cpf já existe
    let verificaCpf = this.repositorio.verificaCpfExistente(newCPF);
    //Valida cpf e adiciona ao paciente
    let retornoCpf = paciente.validaCpf(newCPF);
    if (retornoCpf && !verificaCpf) {
      return true;
    } else if (verificaCpf) {
      return 'Erro: CPF já cadastrado.';
    } else {
      return 'Erro: CPF inválido.';
    }
  }

  cadastroDeNome(paciente, newNome) {
    let retornoNome = paciente.validaNome(newNome);
    if (retornoNome) {
      return true;
    } else {
      return 'Erro: Nome do paciente precisa ter no mínimo 5 caracteres.';
    }
  }

  cadastroDeDataNascimento(paciente, newDataNascimento) {
    let retornoDataNascimento = paciente.validaData(newDataNascimento);
    if (retornoDataNascimento[0] == false) {
      if (retornoDataNascimento[1] == 1) {
        return 'Erro: formato da data está incorreto.';
      }
      if (retornoDataNascimento[1] == 2) {
        return 'Erro: paciente deve ter pelo menos 13 anos.';
      }
    } else {
      return true;
    }
  }

  cadastroFinal(paciente) {
    this.repositorio.registrarNovoPaciente([
      paciente,
      paciente.validaIdade(paciente.dataNacimentoPaciente),
    ]);
    return 'Paciente cadastrado com sucesso!';
  }

  listagemDePacientesPorNome() {
    this.repositorio.listagemDePacientes();
  }

  exclusaoPaciente(cpf) {
    return this.repositorio.exclusaoDePaciente(cpf);
  }

  encontraPaciente(cpf) {
    return this.repositorio.verificaCpfExistente(cpf);
  }
}
