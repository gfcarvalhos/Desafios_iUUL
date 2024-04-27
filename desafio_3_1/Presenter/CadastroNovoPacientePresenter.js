import { OperationError } from '../controller/OperationError.js';
import { PacienteController } from '../controller/PacienteController.js';
import {
  CadastroNovoPacienteView,
  OperationFailureMessage,
  OperationSucess,
} from '../view/CadastroNovoPacienteView.js';

export class CadastroNovoPacientePresenter {
  #viewNovoPaciente;
  #PacienteController;
  #messageFailure;

  constructor() {
    this.#viewNovoPaciente = new CadastroNovoPacienteView();
    this.#PacienteController = new PacienteController();
    this.#messageFailure = new OperationFailureMessage();
  }

  async run() {
    let newCPF = this.#viewNovoPaciente.leituraDeCpf();
    let pacienteExiste = this.#PacienteController.verificaExistenciaDeCpf(newCPF);
    if (pacienteExiste.status) {
      this.#messageFailure.setupMessage(OperationError.PATIENT_ALREADY_EXISTS);
    }
    let newNome = this.#viewNovoPaciente.leituraNome();
    let newDataPaciente = this.#viewNovoPaciente.leituraDataNascimento();

    let newPaciente = await this.#PacienteController.salvarNovoPaciente(
      newNome,
      newCPF,
      newDataPaciente,
    );
    OperationSucess.setupMessage(newPaciente.status);
  }
}
