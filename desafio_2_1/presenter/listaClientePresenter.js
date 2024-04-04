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

  /**
   * Gerencia a validação e criação da lista dos clientes
   * @returns {Object} Lista dos Clientes
   */
  run() {
    //Cria a lista a partir do arquivo com caminho já validado e valida as informações
    const listaClientesValidar = this.validaCaminho().then((lista) => {
      const listaParseada = JSON.parse(lista);
      listaParseada.forEach((element,index) => {
        console.log(element);
      });
    });
  }

  /**
   * Valida o caminho do arquivo e retorna a lista de objetos
   * @returns {Array} Lista de clientes
   */
  validaCaminho() {
    const listaDeClientes = this.#view
      .verificaCaminho()
      .then((path) => this.#view.realizaLeituraDoArquivo(path))
      .then((resultado) => {
        return resultado;
      });

    return listaDeClientes;
  }
}

export { listaClientePresenter };
