import { ConsultaPresenter } from './ConsultaPresenter.js';
import { PacientePresenter } from './PacientePresenter.js';

export class MenuPresenter {
  #consultaPresenter;
  #pacientePresenter;

  constructor() {
    this.#pacientePresenter = new PacientePresenter();
    this.#consultaPresenter = new ConsultaPresenter();
  }

  pacientePresenter() {
    return this.#pacientePresenter;
  }

  consultaPresenter() {
    return this.#consultaPresenter;
  }

}
