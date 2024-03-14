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

  //A verifica no repositorio se existe consultas futuras com o cpf do paciente,
  // em seguida verifica se o paciente existe no repositorio de pacientes. Retorna
  // frases de erro quando o paciente nao está cadastrado e quando há consultas futuras
  verificaCPF(pacienteService, cpf) {
    let AgendaPaciente = this.repositorioConsulta.verificaAgendaPaciente(cpf);
    let retornoCpf = pacienteService.encontraPaciente(cpf);
    if (!retornoCpf) {
      return 'Erro: paciente não cadastrado';
    } else if (AgendaPaciente) {
      return 'Erro: paciente já possui uma consulta agendada';
    } else {
      return true;
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

  validaHoraFinalService(horaFinal, consulta) {
    return consulta.validaHoraFinal(horaFinal);
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
    return this.repositorioConsulta.verificaAgendaPaciente(cpf);
  }

  exclusaoDeConsultasPorCpf(cpf) {
    return this.repositorioConsulta.exclusaoDeConsultasPassadas(cpf);
  }

  listagemProvisoria() {
    return this.repositorioConsulta.listagemDeConsultas();
  }
}
