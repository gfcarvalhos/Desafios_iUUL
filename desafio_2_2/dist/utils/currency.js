"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Currency = void 0;
class Currency {
    static run(taxa, moedaOrigem, moedaDestino, AntigoValor) {
        let novoValor = taxa * +AntigoValor;
        novoValor = novoValor.toFixed(2).replace('.', ',');
        ;
        AntigoValor = AntigoValor.replace('.', ',');
        const taxaTexto = taxa.toFixed(6).replace('.', ',');
        return `${moedaOrigem} ${AntigoValor} => ${moedaDestino} ${novoValor} \nTaxa: ${taxaTexto}`;
    }
}
exports.Currency = Currency;
