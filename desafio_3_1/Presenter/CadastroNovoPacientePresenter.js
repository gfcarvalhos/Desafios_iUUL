import { OperationError } from '../controller/OperationError.js';
import { PacienteService } from '../controller/PacienteController.js';
import {
  CadastroNovoPacienteView,
  OperationFailureMessage,
  OperationSucess,
} from '../view/CadastroNovoPacienteView.js';

export class CadastroNovoPacientePresenter {
  #viewNovoPaciente;
  #pacienteService;
  #messageFailure;

  constructor() {
    this.#viewNovoPaciente = new CadastroNovoPacienteView();
    this.#pacienteService = new PacienteService();
    this.#messageFailure = new OperationFailureMessage();
  }

  run() {
    let newCPF = this.#viewNovoPaciente.leituraDeCpf();
    let pacienteExiste = this.#pacienteService.verificaExistenciaDeCpf(newCPF);
    if (pacienteExiste.status) {
      this.#messageFailure.setupMessage(OperationError.PATIENT_ALREADY_EXISTS);
    }
    let newNome = this.#viewNovoPaciente.leituraNome();
    let newDataPaciente = this.#viewNovoPaciente.leituraDataNascimento();

    let newPaciente = this.#pacienteService.criarPaciente(
      newNome,
      newCPF,
      newDataPaciente,
    );
    OperationSucess.setupMessage(newPaciente.status);
  }
}
