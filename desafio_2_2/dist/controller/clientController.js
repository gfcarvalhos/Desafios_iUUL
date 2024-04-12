"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clienteController = void 0;
const Cliente_js_1 = require("../model/Cliente.js");
const errorController_js_1 = require("./errorController.js");
class clienteController {
    createNewClient(moedaOrigem, moedaDestino, valor, httpClientService) {
        return new Cliente_js_1.Cliente(moedaOrigem, moedaDestino, valor, httpClientService);
    }
    getInfo(newCliente) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const objeto = yield newCliente.httpGet();
                if ('result' in objeto && objeto.result === 'success' && 'conversion_rate' in objeto && typeof objeto.conversion_rate === 'number') {
                    return [errorController_js_1.OperationStatus.SUCCESS, objeto.conversion_rate];
                }
                else {
                    return [errorController_js_1.OperationStatus.FAILURE, errorController_js_1.OperationErrors.API_ERROR];
                }
            }
            catch (err) {
                return [errorController_js_1.OperationStatus.FAILURE, errorController_js_1.OperationErrors.API_ERROR];
            }
        });
    }
    validaMoeda(moeda) {
        const moedaValidada = Cliente_js_1.Cliente.validaMoeda(moeda);
        return moedaValidada;
    }
}
exports.clienteController = clienteController;
