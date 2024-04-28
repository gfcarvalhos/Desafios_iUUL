import { Consulta } from '../Entities/Consulta.js';
import { OperationError, OperationStatus } from './OperationError.js';
import { PacienteController } from './PacienteController.js';

export class ConsultaController {
  consulta;

  constructor() {
    this.consulta = new Consulta();
  }

  /**
   * Busca consultas futuras por cpf
   * @param {String} cpf 
   * @returns Object
   */
  async verificaConsultaPorCpf(cpf) {
    let AgendaPaciente = await this.consulta.buscaConsultaFuturaPorCpf(cpf);
    if (AgendaPaciente) {
      return {status: OperationStatus.SUCCESS, message: OperationError.PATIENT_HAS_APPOINTMENT}
    } else {
      return {status: OperationStatus.FAILURE}
    }
  }

  /**
   * Retorna todas as consultas por cpf quando existe
   * @param {String} cpf 
   * @returns 
   */
  async retornaConsultasPorCpf(cpf){
    let agendaPaciente = await this.consulta.buscaConsultasPorCpf(cpf)
    if(!agendaPaciente){
      return {status: OperationStatus.FAILURE, message: OperationError.PATIENT_DOESNT_HAVE_APPOINTMENT};
    }
    else{
      return {status: OperationStatus.SUCCESS, data: agendaPaciente};
    }

  }

  async validaAgendamentoSobreposto(dataConsultaPendente, horaInicialPendente) {
    let agendamentoSobreposto = await
      this.consulta.validaAgendamentoSobrepostoConsulta(dataConsultaPendente, horaInicialPendente);
    if (agendamentoSobreposto) {
      return {status: OperationStatus.SUCCESS, message: OperationError.SCHEDULED_TIME_OVERLAY};
    } else {
      return {status: OperationStatus.FAILURE}
    }
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

  async registroDeNovaConsulta(cpfConsulta, dataConsulta, horaInicialConsulta, horaFinalConsulta){
    let newConsulta = new Consulta(cpfConsulta, dataConsulta, horaInicialConsulta, horaFinalConsulta)
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
