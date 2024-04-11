"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewClient = void 0;
const clientController_1 = require("../controller/clientController");
class viewClient {
    run() {
        console.log('Welcome to the first test!');
        const controller = new clientController_1.clienteController;
        controller.getInfo();
    }
}
exports.viewClient = viewClient;
