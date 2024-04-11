"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteController = void 0;
const Cliente_js_1 = require("../model/Cliente.js");
const httpCliente_js_1 = require("../utils/httpCliente.js");
class clienteController {
    getInfo() {
        const client = new Cliente_js_1.Cliente('str', 'str', new httpCliente_js_1.httpClient);
        const retorno = client.httpGet();
        return retorno;
    }
}
exports.clienteController = clienteController;
