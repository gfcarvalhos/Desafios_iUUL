import readlineSync from 'readline-sync';
import { ConsultaView } from './ConsultaView.js';
import { PacienteView } from './PacienteView.js';
import { OperationError } from '../controller/OperationError.js';

export class mainView {
  #menuPaciente;
  #menuConsulta;

  constructor(presenter) {
    this.#menuPaciente = new PacienteView(presenter.pacientePresenter());
    this.#menuConsulta = new ConsultaView(presenter.consultaPresenter());
  }

  async menuPrincipal() {
    let constrolador = true;
    while (constrolador) {
      let opcaoMenuPrincipal = readlineSync.questionInt(
        '\nMenu Principal \n 1-Cadastro de pacientes \n 2-Agenda \n 3-Fim \n',
      );
      try {
        switch (opcaoMenuPrincipal) {
          case 1:
            await this.#menuPaciente.menuPrincipalPaciente();
            break;
          case 2:
            await this.#menuConsulta.menuPrincipalConsulta();
            break;
          case 3:
            constrolador = false;
            break;
          default:
            throw new Error('\nErro: Opção inválida.');
        }
      } catch (error) {
        console.error('\n' + error.message);
      }
    }
  }
}
