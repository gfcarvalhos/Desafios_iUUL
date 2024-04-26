import { PacienteService } from '../Services/PacienteService.js';
import {
  CadastroNovoPacienteView,
  OperationFailureMessage,
  OperationSucess,
} from '../view/CadastroNovoPacienteView.js';

export class PacientePresenter {
  #pacienteService;
  #viewNovoPaciente;
  #messageFailure;

  constructor() {
    this.#pacienteService = new PacienteService();
    this.#viewNovoPaciente = new CadastroNovoPacienteView();
    this.#messageFailure = new OperationFailureMessage();
  }

  run(opcao) {
    switch (opcao) {
      case 1:
        this.cadastroDeNovoPaciente();
      case 2:
      case 3:
      case 4:
    }
  }

  cadastroDeNovoPaciente() {
    let newCPF = this.#viewNovoPaciente.leituraDeCpf();
    let pacienteExiste = this.#pacienteService.encontraPaciente(newCPF);
    if (pacienteExiste.status) {
      this.#messageFailure.setupMessage(pacienteExiste.message);
    }
    let newNome = this.#viewNovoPaciente.leituraNome();
    let newDataPaciente = this.#viewNovoPaciente.leituraDataNascimento();

    let newPaciente = this.#pacienteService.criarPaciente(
      newNome,
      newCPF,
      newDataPaciente,
    );
    OperationSucess.setupMessage(newPaciente.status);
  }
}

function menuPaciente(servicePaciente, serviceConsulta) {
  let controladorPaciente = true;
  while (controladorPaciente) {
    let menuPaciente = readlineSync.questionInt(
      '\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) \n 5-Voltar p/ menu principal \n',
    );
    //Cadastro de novo paciente
    if (menuPaciente == 1) {
    }
    if (menuPaciente == 2) {
      let cpfPaciente = readlineSync.question('\nCPF:');
      let exclusaoDePaciente = servicePaciente.exclusaoPaciente(
        cpfPaciente,
        serviceConsulta,
      );
      if (exclusaoDePaciente == true) {
        console.log('\n Paciente excluído com sucesso! \n');
      } else {
        console.log('\n' + exclusaoDePaciente + '\n');
      }
    }
    if (menuPaciente == 3) {
      servicePaciente.listagemDePacientes(serviceConsulta, 2);
    }
    if (menuPaciente == 4) {
      servicePaciente.listagemDePacientes(serviceConsulta, 1);
    }
    if (menuPaciente == 5) {
      controladorPaciente = false;
    }
  }
}
