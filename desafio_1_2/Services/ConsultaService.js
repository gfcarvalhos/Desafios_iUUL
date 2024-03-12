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

  verificaCPF(pacienteService, cpf) {
    let retorno = pacienteService.encontraPaciente(cpf);
    if (retorno) {
      return true;
    } else {
      return 'Erro: paciente não cadastrado';
    }
  }

  salvaCpf(cpf, consulta) {
    consulta.registraCpf(cpf);
  }

  validaDataAgendamento(dataAgendamento, consulta) {
    return consulta.validaData(dataAgendamento);
  }

  validaHoraInicialService(horaInicial, consulta) {
    return consulta.validaHoraInicial(horaInicial);
  }
}
