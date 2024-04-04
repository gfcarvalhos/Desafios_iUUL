class Output {
  /**
   * Imprime no consoler erros quanto ao path do documento.
   */
  write(info) {
    process.stdout.write(`${info}\n`);
  }

  

}

export {Output}