import { FilePath } from '../utils/filePath.js';

class listaClienteView {
  #file
  #filePath

  constructor() {
    this.#filePath = new FilePath();
    this.#file = process.argv;
  }

/**
 * Verifica se caminho foi inputado
 * @returns {Bolean} Caminho correto
 */
  verificaCaminho() {
    return this.#filePath.validaCaminho(this.#file[2]);
  }
}

export { listaClienteView };
