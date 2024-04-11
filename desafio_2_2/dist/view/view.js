"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.View = void 0;
const errorController_1 = require("../controller/errorController");
class View {
    constructor() {
        this.message = new Map();
        this.messageSetup();
    }
    /**
    * Mapeia a mensagem referente ao código retornado do controller
    * @param {Number} erro codigo do erro
    * @returns {Object} objeto com o campo e mensagem de erro
    */
    getErro(erro) {
        return this.message.get(erro);
    }
    /**
     * Traduz os códigos de erros do controller
     * @param {Array} erros erros traduzidos
     */
    messageSetup() {
        this.message.set(errorController_1.OperationErrors.INVALID_CURRENCY, '\nErro: Valor inválido para moeda.');
        this.message.set(errorController_1.OperationErrors.SAME_CURRENCY, '\nErro: A moeda de destino é a mesma de origem.');
        this.message.set(errorController_1.OperationErrors.VALUE_NEGATIVE, '\nErro: Valor monetário negativo.');
        this.message.set(errorController_1.OperationErrors.INVALID_VALUE, '\nErro: Formato inválido.');
    }
}
exports.View = View;
