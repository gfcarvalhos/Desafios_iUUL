import { ConsultaService } from '../controller/ConsultaController.js';
import { PacienteService } from '../controller/PacienteController.js';
import { CadastroNovoPacientePresenter } from './CadastroNovoPacientePresenter.js';
import { ExclusaoPacientePresenter } from './ExclusaoPacientePresenter.js';

export class PacientePresenter {
  #pacienteService;
  #cadastroPaciente;
  #exclusaoPaciente;
  #serviceConsulta;

  constructor() {
    this.#pacienteService = new PacienteService();
    this.#cadastroPaciente = new CadastroNovoPacientePresenter();
    this.#exclusaoPaciente = new ExclusaoPacientePresenter();
    this.#serviceConsulta = new ConsultaService();
  }

  run(opcao) {
    switch (opcao) {
      case 1:
        this.#cadastroPaciente.run();
        break;
      case 2:
        this.#exclusaoPaciente.run();
        break;
      case 3:
        this.listaPacienteCPF();
        break;
      case 4:
        this.listaPacienteNome();
        break;
    }
  }

  listaPacienteCPF() {
    this.#pacienteService.listagemDePacientes(this.#serviceConsulta, 2);
  }

  listaPacienteNome() {
    this.#pacienteService.listagemDePacientes(this.#serviceConsulta, 1);
  }
}
