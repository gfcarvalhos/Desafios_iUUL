import { Paciente } from '../Entities/Paciente.js';
import { PacienteRepository } from '../repositories/PacienteRepository.js';

export class PacienteService {
  criarPaciente() {
    return new Paciente();
  }

  cadastroDeCpf(paciente, newCPF, repositorio) {
    //Verifica se cpf já existe
    let verificaCpf = repositorio.verificaCpfExistente(newCPF);
    //Valida cpf e adiciona ao paciente
    let retornoCpf = paciente.validaCpf(newCPF);
    if (retornoCpf && !verificaCpf) {
      return true;
    } else if(verificaCpf){
      return 'Erro: CPF já cadastrado.'
    }
    else {
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
    repositorio.registrarNovoPaciente([
      paciente,
      paciente.validaIdade(paciente.dataNacimentoPaciente),
    ]);
    return 'Paciente cadastrado com sucesso!';
  }

  listagemDePacientesPorNome(repositorio) {
    repositorio.listagemDePacientes();
  }
}
