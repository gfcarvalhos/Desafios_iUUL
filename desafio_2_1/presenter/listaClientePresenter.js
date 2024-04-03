import { listaClienteView } from '../view/listaClienteView.js';

class listaClientePresenter {
  #controller;
  #view;

  constructor(controller) {
    this.#controller = controller;

    this.#view = new listaClienteView();
  }

  run(){
    this.#view.pathFile;
  }
}

export { listaClientePresenter };
