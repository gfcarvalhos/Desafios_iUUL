import { PacienteController } from "../controller/PacienteController.js";
import { ListaPacienteView } from "../view/ListaPacienteView.js";
import { Paciente } from '../Entities/Paciente.js';

export class ListagemPacientePresenter{
  #viewListagem
  #pacienteController

  constructor(){
    this.#viewListagem = new ListaPacienteView;
    this.#pacienteController = new PacienteController;
  }

  async run(option){
    //Busca no banco os pacientes
    let listaPacientes = await this.#pacienteController.buscaPacientes()
    //ordena por opção dada pelo user
    switch(option){
      case 3:
        listaPacientes = this.ordenaPorCpf(listaPacientes);
        break;
      case 4:
        listaPacientes = this.ordenaPorNorme(listaPacientes);
        break
    }
    //Chama a view para construir resultado final
    this.#viewListagem.listagemDePacientes(listaPacientes)

  }

  //Ordena por nome do paciente de A a Z: objeto no indice 0 da lista Paciente
  ordenaPorNorme(listaPacientes) {
    return listaPacientes.sort((a, b) =>
      a.nomePaciente.localeCompare(b.nomePaciente),
    );
  }

  //Ordena por cpf do paciente em ordem crescente: objeto no indice 0 da lista Paciente
  ordenaPorCpf(listaPacientes) {
    return listaPacientes.sort((a, b) => {
      let compara = parseInt(a.cpfPaciente) - parseInt(b.cpfPaciente);
      if (compara < 0) {
        return -1;
      } else if (compara > 0) {
        return 1;
      } else return 0;
    });
  }

}