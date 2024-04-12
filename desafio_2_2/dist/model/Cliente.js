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
exports.Cliente = void 0;
const errorController_1 = require("../controller/errorController");
const envFile_1 = require("../envFile");
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
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getAPICurrency.get('https://v6.exchangerate-api.com/v6', [(0, envFile_1.env_KEYAPI)(), this.moedaOrigem, this.moedaDestino]);
        });
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
