"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const clientController_1 = require("./controller/clientController");
const menu_1 = require("./view/menu");
function main() {
    const menu = new menu_1.Menu;
    const controller = new clientController_1.clienteController;
    menu.run(controller);
}
main();
