import { ConsultaService } from '../controller/ConsultaController.js';
import { OperationError } from '../controller/OperationError.js';
import { PacienteController } from '../controller/PacienteController.js';
import {
  OperationFailureMessage,
  ExclusaoDePacienteView,
  OperationSucess,
} from '../view/ExclusaoDePacienteView.js';

export class ExclusaoPacientePresenter {
  #viewExclusaoPaciente;
  #PacienteController;
  #consultaService;
  #messageFailure;

  constructor() {
    this.#viewExclusaoPaciente = new ExclusaoDePacienteView();
    this.#PacienteController = new PacienteController();
    this.#messageFailure = new OperationFailureMessage();
    this.#consultaService = new ConsultaService();
  }

  run() {
    //coleta da view um cpf válido
    let cpfPaciente = this.#viewExclusaoPaciente.leituraDeCpf();
    //Verifica se cpf existe no bd de pacientes
    let pacienteExiste =
      this.#PacienteController.verificaExistenciaDeCpf(cpfPaciente);
    if (!pacienteExiste.status) {
      this.#messageFailure.setupMessage(OperationError.PATIENT_NOT_REGISTERED);
    }
    //Verifica se o paciente possui agendamento futuro
    let verificaAgenda =
      this.#consultaService.verificaExistenciaDeAgendaDoPaciente(cpfPaciente);
    if (verificaAgenda) {
      this.#messageFailure.setupMessage(OperationError.PATIENT_HAS_APPOINTMENT);
    }
    //Exclui o paciente do BD
    let exclusaoDePaciente =
      this.#PacienteController.exclusaoPaciente(cpfPaciente);
    //Deve sair após implementação do BD
    this.#consultaService.exclusaoDeConsultasPorCpf(cpfPaciente);
    OperationSucess.setupMessage(exclusaoDePaciente.status);
  }
}
