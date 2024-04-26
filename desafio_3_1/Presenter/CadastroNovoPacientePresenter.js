import { PacienteService } from "../Services/PacienteService"
import { CadastroNovoPacienteView } from "../view/CadastroNovoPacienteView"

export class CadastroNovoPacientePresenter {
  #viewNovoPaciente
  #servicePaciente

  constructor(){
    this.#viewNovoPaciente = new CadastroNovoPacienteView
    this.#servicePaciente = new PacienteService
  }

  controleDeCadastro(){
    try {
      
    } catch (erro){

    }
  }
}