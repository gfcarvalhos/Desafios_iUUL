import { listaClienteView } from '../view/listaClienteView.js';
/**
 * Faz o gerenciamento da validação dos dados a partir do controller da lista recebida pela view.
 */
class listaClientePresenter {
  #controller;
  #view;


  constructor(controller) {
    this.#controller = controller;

    this.#view = new listaClienteView();
  }

  run() {
    //Lê o caminho do arquivo
    const path = this.#view.verificaCaminho();
  }
}

export { listaClientePresenter };
