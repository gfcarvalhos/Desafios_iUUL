import { Consulta } from '../Entities/Consulta.js';
import { ConsultaRepository } from '../repositories/ConsultaRepository.js';
import { PacienteService } from './PacienteService.js';

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
  verificaCPF(pacienteService, cpf, serviceNumber) {
    let AgendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    let retornoCpf = pacienteService.encontraPaciente(cpf);
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
    return Consulta.validaHoraFinal(horaFinal, consulta.horaFinalConsulta);
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

  verificaAgendaDoPaciente(cpf) {
    let agendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    if (agendaPaciente.length === 0) {
      return [false];
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
}
