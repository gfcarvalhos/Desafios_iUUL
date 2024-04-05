import fs from 'fs/promises';
import path from 'path';

class Output {
  /**
   * Imprime no consoler erros quanto ao path do documento.
   */
  write(info) {
    process.stdout.write(`${info}\n`);
  }

  static geraArquivo(listaRetorno, caminho) {
    const diretorio = path.dirname(caminho)
    fs.writeFile(diretorio + '\\output.json', listaRetorno).then(console.log('\nTratamento Finalizado.'));
  }
}

export { Output };
