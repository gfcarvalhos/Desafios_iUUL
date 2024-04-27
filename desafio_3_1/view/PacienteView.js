import readlineSync from 'readline-sync';

export class PacienteView {
  #pacientePresenter

  constructor(presenter){
    this.#pacientePresenter = presenter
  }

  async menuPrincipalPaciente() {
    let controladorPaciente = true;
    while (controladorPaciente) {
      this.mensagemMenu();
      let opcaoMenuPaciente = readlineSync.questionInt();
      switch (opcaoMenuPaciente){
        case 1:
        case 2:
        case 3:
        case 4:
          await this.#pacientePresenter.run(opcaoMenuPaciente);
          break;
        case 5:
          controladorPaciente = false;
          break
        default:
          throw new Error('\nErro: Opção inválida.')
      }
      
    }
  }
  mensagemMenu() {
    console.log('\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) \n 5-Voltar p/ menu principal \n');
  }
}