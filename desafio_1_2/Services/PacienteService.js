import { Paciente } from '../Entities/Paciente.js';
import { PacienteRepository } from '../repositories/PacienteRepository.js';

export class PacienteService {
  criarPaciente() {
    return new Paciente();
  }

  cadastroDeCpf(paciente, newCPF) {
    let retornoCpf = paciente.validaCpf(newCPF);
    if (retornoCpf) {
      return true;
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

  criacaoDeRepositorio() {
    return new PacienteRepository();
  }

  cadastroFinal(paciente, repositorio) {
    repositorio.registrarNovoPaciente(paciente)
    return 'Paciente cadastrado com sucesso!';
  }
}
