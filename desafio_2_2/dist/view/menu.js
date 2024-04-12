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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
const httpCliente_1 = require("../utils/httpCliente");
const view_1 = require("./view");
const currency_1 = require("../utils/currency");
const errorController_1 = require("../controller/errorController");
class Menu {
    run(controller) {
        return __awaiter(this, void 0, void 0, function* () {
            const view = new view_1.View();
            let validador = true;
            while (validador) {
                const moedaOrigem = readline_sync_1.default.question('Moeda Origem: ');
                if (moedaOrigem == '') {
                    break;
                }
                const moedaOrigemValida = controller.validaMoeda(moedaOrigem);
                if (moedaOrigemValida[0] !== 1) {
                    console.log(view.getErro(moedaOrigemValida[1]));
                    break;
                }
                const moedaDestino = readline_sync_1.default.question('Moeda Destino: ');
                if (moedaDestino === moedaOrigem) {
                    console.log(view.getErro(2));
                }
                const moedaDestinoValida = controller.validaMoeda(moedaDestino);
                if (moedaDestinoValida[0] !== 1) {
                    console.log(view.getErro(moedaDestinoValida[1]));
                    break;
                }
                const valor = readline_sync_1.default.questionFloat('Valor: ');
                const cliente = controller.createNewClient(moedaOrigem, moedaDestino, valor, new httpCliente_1.httpClient);
                const currency = yield controller.getInfo(cliente);
                if (currency[0] === errorController_1.OperationStatus.FAILURE) {
                    console.log(view.getErro(currency[1]));
                    break;
                }
                const mensagemFinal = currency_1.Currency.run(currency[1], moedaOrigem, moedaDestino, valor);
                console.log(`\n${mensagemFinal}\n`);
            }
        });
    }
    ;
}
exports.Menu = Menu;
