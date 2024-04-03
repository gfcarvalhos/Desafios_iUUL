import { FilePath } from '../utils/filePath.js';

class listaClienteView {
  #filepath

  constructor() {
    this.#filepath = new FilePath();
  }

  get pathFile() {
    console.log(this.#filepath.argName);
  }
}

export { listaClienteView };
