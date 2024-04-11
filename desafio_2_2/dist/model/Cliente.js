"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cliente = void 0;
class Cliente {
    constructor(moedaOrigem, moedaDestino, getAPICurrency) {
        this.moedaOrigem = moedaOrigem;
        this.moedaDestino = moedaDestino;
        this.getAPICurrency = getAPICurrency;
    }
    createNewCliente() {
    }
    httpGet() {
        console.log(this.getAPICurrency.get('teste', ['test1', 'teste']));
    }
}
exports.Cliente = Cliente;
