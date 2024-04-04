import { FilePath } from '../utils/filePath.js';

class listaClienteView {
  #file
  #filePath

  constructor() {
    this.#filePath = new FilePath();
    this.#file = process.argv;
  }

/**
 * Verifica se caminho foi inputado e  se é um arquivo válido (json)
 * @returns {String} Caminho do arquivo json
 */
  async verificaCaminho() {
    const result = this.#filePath.validaCaminho(this.#file[2]);
    return result
  }

  async realizaLeituraDoArquivo(path){
    const lista = await this.#filePath.leituraDeArquivo(path);
    return lista;
  }
}


export { listaClienteView };
