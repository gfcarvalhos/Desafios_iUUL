import { PacienteService } from '../Services/PacienteService.js';
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
    let pacienteExiste = this.#pacienteService.encontraPaciente(newCPF);
    if (pacienteExiste.status) {
      this.#messageFailure.setupMessage(pacienteExiste.message);
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
