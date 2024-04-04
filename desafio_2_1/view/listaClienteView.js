import { OperationErrors } from '../controller/errorController.js';
import { FilePath } from '../utils/filePath.js';

class listaClienteView {
  #file;
  #filePath;
  #message;

  constructor() {
    this.#filePath = new FilePath();
    this.#file = process.argv;
    this.#message = new Map();

    this.#messageSetup();
  }

  /**
   * Verifica se caminho foi inputado e  se é um arquivo válido (json)
   * @returns {String} Caminho do arquivo json
   */
  async verificaCaminho() {
    const result = this.#filePath.validaCaminho(this.#file[2]);
    return result;
  }

  async realizaLeituraDoArquivo(path) {
    const lista = await this.#filePath.leituraDeArquivo(path);
    return lista;
  }
  getErro(erro){
    return this.#message.get(erro);
  }


  /**
   * Traduz os códigos de erros do controller
   * @param {Array} erros erros traduzidos
   */
  #messageSetup() {
    this.#message.set(
      OperationErrors.QTD_CARACTERES_FORA_DO_INTERVALO,
      {'nome': 'O nome do cliente está fora do intervalo de caracteres (5 a 60).'}
    );

    this.#message.set(
      OperationErrors.CPF_INFORMADO_INVALIDO,
      {'cpf':'CPF inválido'}
    );

    this.#message.set(
      OperationErrors.IDADE_ABAIXO_DA_MINIMA,
      {'dt_nascimento':'Cliente menor de idade.'}
    );

    this.#message.set(
      OperationErrors.DATA_INVALIDA,
      {'dt_nascimento':'Formato de data incorreto.'}
    );

    this.#message.set(
      OperationErrors.VALOR_RENDA_INVALIDO,
      {'renda_mensal':'Valor inválido para renda.'}
    );

    this.#message.set(
      OperationErrors.ESTADO_CIVIL_INVALIDO,
      {'estado':'Valor inválido para estado civil.'}
    )

  }
}

export { listaClienteView };
