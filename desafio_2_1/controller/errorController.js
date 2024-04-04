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

export class OperationErrors {
  static get QTD_CARACTERES_FORA_DO_INTERVALO() {
    return 1;
  }

  static get CPF_INFORMADO_INVALIDO() {
    return 2;
  }

  static get IDADE_ABAIXO_DA_MINIMA() {
    return 3;
  }

  static get DATA_INVALIDA() {
    return 4;
  }

  static get VALOR_RENDA_INVALIDO() {
    return 5;
  }

  static get ESTADO_CIVIL_INVALIDO() {
    return 6;
  }
}
