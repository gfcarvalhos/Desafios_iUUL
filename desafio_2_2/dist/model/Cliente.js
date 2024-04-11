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
        console.log(this.getAPICurrency.get('teste', ['test1', 'teste']));
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
        return true;
    }
}
exports.Cliente = Cliente;
