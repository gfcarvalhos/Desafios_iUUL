"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OperationErrors = exports.OperationStatus = void 0;
/**
 * Classe com os códigos de SUCESSO e FALHA de uma operação
 * no controller
 */
class OperationStatus {
    static get SUCCESS() {
        return 1;
    }
    static get FAILURE() {
        return 2;
    }
}
exports.OperationStatus = OperationStatus;
/**
 * Classe de erros de operação.
 */
class OperationErrors {
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
    static get API_ERROR() {
        return 5;
    }
}
exports.OperationErrors = OperationErrors;
