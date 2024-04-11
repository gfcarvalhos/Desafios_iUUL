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

/**
 * Classe de erros de operação.
 */
export class OperationErrors {
  static get INVALID_CURRENCY() {
    return 1;
  }

  static get SAME_CURRENCY() {
    return 2;
  }

  static get VALUE_NEGATIVE() {
    return 3;
  }

  static get INVALID_VALUE() {
    return 4;
  }

}
