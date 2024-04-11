"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteController = void 0;
const Cliente_js_1 = require("../model/Cliente.js");
class clienteController {
    createNewClient(moedaOrigem, moedaDestino, valor, httpClientService) {
        return new Cliente_js_1.Cliente(moedaOrigem, moedaDestino, valor, httpClientService);
    }
    getInfo(newCliente) {
        const retorno = newCliente.httpGet();
        return retorno;
    }
    validaMoeda(moeda) {
        const moedaValidada = Cliente_js_1.Cliente.validaMoeda(moeda);
        return moedaValidada;
    }
}
exports.clienteController = clienteController;
