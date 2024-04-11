"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Menu = void 0;
const readline_sync_1 = __importDefault(require("readline-sync"));
const httpCliente_1 = require("../utils/httpCliente");
const view_1 = require("./view");
class Menu {
    run(controller) {
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
            controller.getInfo(cliente);
            console.log('Fim do processo!');
        }
    }
    ;
}
exports.Menu = Menu;
