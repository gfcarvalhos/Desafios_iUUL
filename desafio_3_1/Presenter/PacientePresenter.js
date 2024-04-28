import { ConsultaService } from '../controller/ConsultaController.js';
import { PacienteController } from '../controller/PacienteController.js';
import { CadastroNovoPacientePresenter } from './CadastroNovoPacientePresenter.js';
import { ExclusaoPacientePresenter } from './ExclusaoPacientePresenter.js';
import { ListagemPacientePresenter } from './ListagemPacientePresenter.js';

export class PacientePresenter {
  #PacienteController;
  #cadastroPaciente;
  #exclusaoPaciente;
  #serviceConsulta;
  #listagemPaciente;

  constructor() {
    this.#PacienteController = new PacienteController();
    this.#cadastroPaciente = new CadastroNovoPacientePresenter();
    this.#exclusaoPaciente = new ExclusaoPacientePresenter();
    this.#serviceConsulta = new ConsultaService();
    this.#listagemPaciente = new ListagemPacientePresenter();
  }

  async run(opcao) {
    switch (opcao) {
      case 1:
        await this.#cadastroPaciente.run();
        break;
      case 2:
        await this.#exclusaoPaciente.run();
        break;
      case 3:
        await this.#listagemPaciente.run(3);
        break;
      case 4:
        await this.#listagemPaciente.run(4);
        break;
    }
  }

  listaPacienteCPF() {
    this.#PacienteController.listagemDePacientes(this.#serviceConsulta, 2);
  }

  listaPacienteNome() {
    this.#PacienteController.listagemDePacientes(this.#serviceConsulta, 1);
  }
}
