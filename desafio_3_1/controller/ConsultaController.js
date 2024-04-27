import { Consulta } from '../Entities/Consulta.js';
import { ConsultaRepository } from '../repositories/ConsultaRepository.js';
import { OperationError, OperationStatus } from './OperationError.js';
import { PacienteController } from './PacienteController.js';

export class ConsultaService {
  constructor() {
    this.repositorioConsulta = new ConsultaRepository();
  }

  criarConsulta() {
    return new Consulta();
  }

  /*Verifica no repositorio se existe consultas futuras com o cpf do paciente,
  em seguida verifica se o paciente existe no repositorio de pacientes. Retorna
  frases de erro quando o paciente nao está cadastrado e quando há consultas futuras*/
  verificaCPF(PacienteController, cpf, serviceNumber) {
    let AgendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    let retornoCpf = PacienteController.encontraPaciente(cpf);
    if (!retornoCpf) {
      return 'Erro: paciente não cadastrado';
    } else if (AgendaPaciente.length !== 0 && serviceNumber === 1) {
      return 'Erro: paciente já possui uma consulta agendada';
    } else {
      return true;
    }
  }

  //Salva o cpf na instancia da consulta
  registraCpfService(cpf, consulta) {
    consulta.registraCpf(cpf);
  }

  //
  validaDataAgendamento(dataAgendamento) {
    return Consulta.validaData(dataAgendamento);
  }

  registraDataService(newData, consulta) {
    consulta.registraDataConsulta(newData);
  }

  validaHoraInicialService(horaInicial, consulta) {
    return Consulta.validaHoraInicial(horaInicial, consulta.dataDeConsulta);
  }

  registraHoraInicialService(horaInicial, consulta) {
    consulta.registraHoraInicial(horaInicial);
  }

  validaHoraFinalService(horaFinal, consulta) {
    return Consulta.validaHoraFinal(horaFinal, consulta.horaInicialConsulta);
  }

  registraHoraFinalService(horaFinal, consulta) {
    consulta.registraHoraFinal(horaFinal);
  }

  validaAgendamentoSobreposto(consulta) {
    let agendamentoSobreposto =
      this.repositorioConsulta.validaAgendamentoSobrepostoConsulta(consulta);
    if (!agendamentoSobreposto) {
      return true;
    } else {
      return 'Erro: já existe uma consulta agendada nesse horário';
    }
  }

  registroFinal(consulta) {
    this.repositorioConsulta.registrarNovaConsulta(consulta);
    return 'Agendamento realizado com sucesso!';
  }

  verificaExistenciaDeAgendaDoPaciente(cpf) {
    let agendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    if (agendaPaciente.length === 0) {
      return { status: OperationStatus.FAILURE };
    } else {
      return { status: OperationStatus.SUCCESS };
    }
  }

  verificaAgendaDoPaciente(cpf) {
    let agendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    if (agendaPaciente.length === 0) {
      return { status: OperationStatus };
    } else {
      return [true, agendaPaciente];
    }
  }

  exclusaoDeConsultasPorCpf(cpf) {
    return this.repositorioConsulta.exclusaoDeConsultasPassadas(cpf);
  }

  listagemProvisoria() {
    return this.repositorioConsulta.listagemDeConsultas();
  }

  excluirConsulta(cpfPaciente, dataConsulta, hora) {
    let excluiConsulta = this.repositorioConsulta.excluiConsulta(
      cpfPaciente,
      dataConsulta,
      hora,
    );
    if (excluiConsulta) {
      return 'Agendamento cancelado com sucesso!';
    } else {
      return 'Erro: agendamento não encontrado';
    }
  }

  validacaoDeDataQualquer(data) {
    let retornoValidaDataQualquer = Consulta.validaDataQualquer(data);
    if (retornoValidaDataQualquer) {
      return true;
    } else {
      return 'Erro: Formato de data inválido.';
    }
  }

  listagemParcialService() {
    // Cabeçalho
    console.log('\n' + '-'.repeat(60));
    console.log(
      'Data' +
        ' '.repeat(9) +
        'H.Ini  H.Fim  Tempo  Nome' +
        ' '.repeat(13) +
        'Dt Nasc.',
    );
    console.log('-'.repeat(60));
  }

  listagemService(servicePaciente, dataInicial, dataFinal, tipoDeListagem) {
    let retornoListagem;
    // Cabeçalho
    console.log('\n' + '-'.repeat(61));
    console.log(
      'Data' +
        ' '.repeat(9) +
        'H.Ini  H.Fim  Tempo  Nome' +
        ' '.repeat(13) +
        'Dt Nasc.',
    );
    console.log('-'.repeat(61));
    if (tipoDeListagem == 1) {
      retornoListagem = this.repositorioConsulta.listagemTotal();
    }
    if (tipoDeListagem == 2) {
      retornoListagem = this.repositorioConsulta.listagemParcial(
        dataInicial,
        dataFinal,
      );
    }

    let monitoraData = '00/00/0000';
    retornoListagem[0].forEach((consulta, index) => {
      const dataConsulta =
        consulta.dataDeConsulta <= monitoraData
          ? ' '.repeat(10)
          : consulta.dataDeConsulta;
      monitoraData = consulta.dataDeConsulta;
      const horaInicial = consulta.horaInicialConsulta;
      const horaFinal = consulta.horaFinalConsulta;
      const tempoDeConsulta = retornoListagem[1][index];
      const nomePaciente = servicePaciente
        .buscaPacienteController(consulta.cpfPacienteConsulta)[0]
        .nomePaciente.padEnd(16, ' ');
      const dataNasc = servicePaciente
        .buscaPacienteController(consulta.cpfPacienteConsulta)[0]
        .dataNacimentoPaciente.padStart(11, ' ');
      const mensagemFinal =
        dataConsulta +
        ' '.repeat(3) +
        horaInicial.slice(0, 2) +
        ':' +
        horaInicial.slice(2, 4) +
        ' '.repeat(2) +
        horaFinal.slice(0, 2) +
        ':' +
        horaFinal.slice(2, 4) +
        ' '.repeat(2) +
        tempoDeConsulta +
        ' '.repeat(2) +
        nomePaciente +
        dataNasc;

      console.log(mensagemFinal);
    });
  }
}
