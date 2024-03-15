import { Paciente } from '../Entities/Paciente.js';
import { PacienteRepository } from '../repositories/PacienteRepository.js';

export class PacienteService {
  constructor() {
    this.repositorio = new PacienteRepository();
  }
  criarPaciente() {
    return new Paciente();
  }

  validaCpfPaciente(paciente, newCPF) {
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

  registraCpfPaciente(paciente, newCPF) {
    paciente.registraCpf(newCPF);
  }

  validaNomePaciente(paciente, newNome) {
    let retornoNome = paciente.validaNome(newNome);
    if (retornoNome) {
      return true;
    } else {
      return 'Erro: Nome do paciente precisa ter no mínimo 5 caracteres.';
    }
  }

  registraNomePaciente(paciente, newNome) {
    paciente.registraNome(newNome);
  }

  validaDataNascimentoPaciente(paciente, newDataNascimento) {
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

  registraDataNascimentoPaciente(paciente, newDataNascimento) {
    paciente.registraDataNascimento(newDataNascimento);
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

  exclusaoPaciente(cpf, serviceConsulta) {
    let retornoRepositorioConsulta =
      serviceConsulta.verificaAgendaDoPaciente(cpf);
    if (retornoRepositorioConsulta) {
      return 'Erro: paciente não pode ser excluído, pois possui consulta agendada.';
    }
    let retornoRepositorioPaciente = this.repositorio.exclusaoDePaciente(cpf);
    if (!retornoRepositorioPaciente) {
      return 'Erro: paciente não cadastrado';
    }
    serviceConsulta.exclusaoDeConsultasPorCpf(cpf);
    return true;
  }

  encontraPaciente(cpf) {
    return this.repositorio.verificaCpfExistente(cpf);
  }
}
