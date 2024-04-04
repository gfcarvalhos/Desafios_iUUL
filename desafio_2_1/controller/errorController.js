/**
 * Classe com os códigos de SUCESSO e FALHA de uma operação
 * no controller
 */
export class OperationStatus {
  static get SUCCESS() {
      return 1;
  }
  static get FAILURE() {
      return 2;
  }
}