import { clienteController } from "../controller/clientController"


export class viewClient{

  run(){
    console.log('Welcome to the first test!')
    const controller = new clienteController;
    controller.getInfo();
  }

}