class FilePath {
  #arg;
  #output;

  constructor() {
    this.#arg = process.argv;
  }

  get argName() {
    return this.#arg[2];
  }
}

export {FilePath}