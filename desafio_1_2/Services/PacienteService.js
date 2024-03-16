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
    if (retornoRepositorioConsulta[0] === true) {
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

  listagemDePacientes(serviceConsulta, tipoDeClassificacao) {
    //Etapa de ordenação da lista de pacientes
    if (tipoDeClassificacao === 1) this.repositorio.ordenaPorNorme();
    else if (tipoDeClassificacao === 2) this.repositorio.ordenaPorCpf();
    // Cabeçalho
    console.log(
      '\n------------------------------------------------------------',
    );
    console.log('CPF         Nome                           Dt.Nasc     Idade');
    console.log('------------------------------------------------------------');
    //Informações por paciente
    this.repositorio.listaDePacientes.forEach((paciente) => {
      const cpf = paciente[0].cpfPaciente.padEnd(7, ' ');
      const nome = paciente[0].nomePaciente.padEnd(16, ' ');
      const dataNascimento = paciente[0].dataNacimentoPaciente.padStart(
        22,
        ' ',
      );
      const idade = paciente[1].toFixed(0).padStart(5, ' ');
      console.log(`${cpf} ${nome} ${dataNascimento} ${idade}`);
      //Verifica a agenda do paciente e caso haja agendas futuras, plota essas consultas
      const agendaDoPaciente = serviceConsulta.verificaAgendaDoPaciente(
        paciente[0].cpfPaciente,
      );
      if (agendaDoPaciente[0] === true) {
        agendaDoPaciente[1].forEach((consulta) => {
          const dataConsulta = consulta.dataDeConsulta;
          const horaInicial = consulta.horaInicialConsulta;
          const horaFinal = consulta.horaFinalConsulta;
          const mensagemFinalConsulta =
            ' '.repeat(12) +
            'Agendado para: ' +
            dataConsulta +
            '\n' +
            ' '.repeat(12) +
            horaInicial.slice(0, 2) +
            ':' +
            horaInicial.slice(2, 4) +
            ' às ' +
            horaFinal.slice(0, 2) +
            ':' +
            horaFinal.slice(2, 4);

          console.log(mensagemFinalConsulta);
        });
      }
    });
  }
}
