import { stat } from 'fs';
import { Output } from './output.js';
import fs from 'fs/promises';

/**
 * Classe valida caminho do arquivo
 */
class FilePath {
  #output;

  constructor() {
    this.#output = new Output();
  }

  async validaCaminho(path) {
    if (!path) {
      this.#output.write('Caminho do arquivo não informado.');
    }
    try {
      const stats = await fs.stat(path);
      if (data.isFile() && path.endsWith('.json')) {
        return path;
      } else {
        this.#output.write('O caminho não refere-se a um arquivo JSON.');
      }
    } catch (err) {
      this.#output.write('Erro ao verificar o arquivo.');
    }
  }
}

export { FilePath };
