import { ConsultaController } from '../controller/ConsultaController.js';
import { PacienteController } from '../controller/PacienteController.js';
import { CadastroNovoPacientePresenter } from './CadastroNovoPacientePresenter.js';
import { ExclusaoPacientePresenter } from './ExclusaoPacientePresenter.js';
import { ListagemPacientePresenter } from './ListagemPacientePresenter.js';

export class PacientePresenter {
  #cadastroPaciente;
  #exclusaoPaciente;
  #listagemPaciente;

  constructor() {
    this.#cadastroPaciente = new CadastroNovoPacientePresenter();
    this.#exclusaoPaciente = new ExclusaoPacientePresenter();
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
        await this.#listagemPaciente.run(opcao);
        break;
      case 4:
        await this.#listagemPaciente.run(opcao);
        break;
    }
  }
}
