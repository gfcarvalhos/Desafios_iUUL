"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
const errorController_1 = require("../controller/errorController");
class Cliente {
    constructor(moedaOrigem, moedaDestino, valor, getAPICurrency) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.valor = valor;
        this.getAPICurrency = getAPICurrency;
    }
    setMoedaOrigem(moeda) {
        this.moedaOrigem = moeda;
    }
    httpGet() {
        const response = this.getAPICurrency.get('https://v6.exchangerate-api.com/v6', [this.moedaOrigem, this.moedaDestino])
            .then((resposta) => { console.log(resposta); });
        return response;
    }
    static validaMoeda(moeda) {
        const validador = (typeof moeda === 'string' && moeda.length === 3);
        if (!validador) {
            return [errorController_1.OperationStatus.FAILURE, errorController_1.OperationErrors.INVALID_CURRENCY];
        }
        else {
            return [errorController_1.OperationStatus.SUCCESS];
        }
    }
    static validaValor(valor) {
        const validador = valor > 0;
        if (!validador) {
            return [errorController_1.OperationStatus.FAILURE, errorController_1.OperationErrors.VALUE_NEGATIVE];
        }
        else {
            return [errorController_1.OperationStatus.SUCCESS];
        }
    }
}
exports.Cliente = Cliente;
