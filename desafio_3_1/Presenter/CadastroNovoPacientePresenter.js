import { OperationError } from '../controller/OperationError.js';
import { PacienteController } from '../controller/PacienteController.js';
import {
  CadastroNovoPacienteView,
  OperationFailureMessage,
  OperationResponse,
} from '../view/CadastroNovoPacienteView.js';

export class CadastroNovoPacientePresenter {
  #viewNovoPaciente;
  #PacienteController;

  constructor() {
    this.#viewNovoPaciente = new CadastroNovoPacienteView();
    this.#PacienteController = new PacienteController();
  }

  async run() {
    let newCPF = this.#viewNovoPaciente.leituraDeCpf();
    let pacienteExiste = await this.#PacienteController.verificaExistenciaDeCpf(
      newCPF,
    );
    if (pacienteExiste.status) {
      OperationFailureMessage.setupMessage(OperationError.PATIENT_ALREADY_EXISTS);
    }
    let newNome = this.#viewNovoPaciente.leituraNome();
    let newDataPaciente = this.#viewNovoPaciente.leituraDataNascimento();

    let newPaciente = await this.#PacienteController.salvarNovoPaciente(
      newNome,
      newCPF,
      newDataPaciente,
    );
    OperationResponse.setupMessage(newPaciente.status);
  }
}
