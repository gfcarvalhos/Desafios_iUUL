import { listaClientePresenter } from '../presenter/listaClientePresenter.js';
import { listaClienteController } from './clienteController.js';

class MainController {
  leituraDeArquivo() {
    const controllerLista = new listaClienteController();
    const presenterLista = new listaClientePresenter(controllerLista);

    presenterLista.run();
  }

}

export { MainController };
