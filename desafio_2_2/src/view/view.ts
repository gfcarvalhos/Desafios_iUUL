import { OperationErrors } from "../controller/errorController";

export class View {
  public message;

  constructor(){
    this.message = new Map();
    this.messageSetup();
  }

  /**
  * Mapeia a mensagem referente ao código retornado do controller
  * @param {Number} erro codigo do erro 
  * @returns {Object} objeto com o campo e mensagem de erro
  */
  getErro(erro: number): string{
    return this.message.get(erro);
  }


  /**
   * Traduz os códigos de erros do controller
   */
  messageSetup() {
    this.message.set(
      OperationErrors.INVALID_CURRENCY,
      '\nErro: Valor inválido para moeda.'
    );

    this.message.set(
      OperationErrors.SAME_CURRENCY,
      '\nErro: A moeda de destino é a mesma de origem.'
    );

    this.message.set(
      OperationErrors.VALUE_NEGATIVE,
      '\nErro: Valor monetário negativo.'
    );

    this.message.set(
      OperationErrors.INVALID_VALUE,
      '\nErro: Formato inválido.'
    );

  }
}