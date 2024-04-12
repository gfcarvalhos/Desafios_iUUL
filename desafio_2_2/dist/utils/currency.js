"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
class Currency {
    static run(taxa, moedaOrigem, moedaDestino, valor) {
        let novoValor = taxa * valor;
        novoValor = novoValor.toFixed(2);
        const AntigoValor = valor.toFixed(2);
        return `${moedaOrigem} ${AntigoValor} => ${moedaDestino} ${novoValor} \nTaxa: ${taxa}`;
    }
}
exports.Currency = Currency;
