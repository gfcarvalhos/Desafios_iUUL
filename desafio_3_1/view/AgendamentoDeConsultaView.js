import readlineSync from 'readline-sync';
import { validaCpf } from '../utils/validaCpf.js';
import { validaData } from '../utils/validaDataConsulta.js';
import { OperationError } from '../controller/OperationError.js';
import { validaHoraFinal, validaHoraInicial } from '../utils/validaHora.js';
import { ConsultaController } from '../controller/ConsultaController.js';

export class AgendamentoDeConsultaView {
  #message;
  #consultaController;

  constructor() {
    this.#message = new OperationFailureMessage();
    this.#consultaController = new ConsultaController();
  }

  leituraDeCpf() {
    while (true) {
      try {
        let newCPF = readlineSync.question('\nCPF: ');
        let valida = validaCpf(newCPF);
        if (valida.status) {
          return newCPF;
        } else {
          this.#message.setupMessage(valida.message);
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }

  leituraDataDeConsulta() {
    while (true) {
      try {
        let dataConsulta = readlineSync.question('Data da consulta:');
        let valida = validaData(dataConsulta);
        if (valida) {
          return dataConsulta;
        } else {
          this.#message.setupMessage(valida.message);
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }

  async leituraHoraInicial(dataConsulta){
    while (true) {
      try {
        let horaInicial = readlineSync.question('Hora Inicial:');
        let valida = validaHoraInicial(horaInicial, dataConsulta);
        if (valida) {
          let validaSobreposicao = await this.#consultaController.validaAgendamentoSobreposto(dataConsulta, horaInicial)
          if(validaSobreposicao.status){
            this.#message.setupMessage(validaSobreposicao.message);
          }
          return horaInicial;
        } else {
          this.#message.setupMessage(valida.message);
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }

  leituraHoraFinal(horaInicial){
    while (true) {
      try {
        let horaFinal = readlineSync.question('Hora Final:');
        let valida = validaHoraFinal(horaFinal, horaInicial);
        if (valida) {
          return horaFinal;
        } else {
          this.#message.setupMessage(valida.message);
        }
      } catch (erro) {
        console.error('\n' + erro);
      }
    }
  }
}

export class OperationFailureMessage {
  setupMessage(response) {
    switch (response) {
      case OperationError.PATIENT_NOT_REGISTERED:
        throw new Error('Paciente não cadastrado.');
      case OperationError.CPF_INVALID:
        throw new Error('CPF inválido.');
      case OperationError.PAST_DATE_NOT_ALLOWED:
        throw new Error('Erro: Data do agendamento tem que ser superior ou igual à data atual.')
      case OperationError.INVALID_DATE:
        throw new Error('Erro: Data inválida.');
      case OperationError.OUT_OF_MINUTES_RANGE:
        throw new Error('Erro: As horas inicial e final devem ser definidas em intervalos de 15 minutos.');
      case OperationError.PAST_HOUR_NOT_ALLOWED:
        throw new Error('Erro: A hora inicial é inferior a hora atual.');
      case OperationError.OUT_OF_OPENING_HOURS:
        throw new Error('Erro: A hora inicial e final devem estar entre 8:00h e 19:00h');
      case OperationError.LOWER_THAN_INITIAL_HOUR:
        throw new Error('Erro: A hora final deve ser superior à hora inicial');
      case OperationError.SCHEDULED_TIME_OVERLAY:
        throw new Error('Erro: já existe uma consulta agendada nesse horário')
    }
  }
}

export class OperationResponse {
  static setupMessage(response) {
    switch (response) {
      case OperationStatus.SUCCESS:
        console.log('\nPaciente registrado com Sucesso!');
        break;
      case OperationStatus.FAILURE:
        throw new Error('Não foi possível cadastrar o paciente.');
    }
  }
}