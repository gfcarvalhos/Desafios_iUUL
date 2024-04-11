import { clienteController } from "./controller/clientController";
import { Menu } from "./view/menu";

function main() {
  const menu = new Menu;
  const controller = new clienteController;
  menu.run(controller);
}

main();
