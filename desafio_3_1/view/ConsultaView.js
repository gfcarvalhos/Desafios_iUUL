export class ConsultaView {
  #consultaPresenter

  constructor(presenter){
    this.#consultaPresenter = presenter
  }

  async menuPrincipalConsulta() {
    let controladorConsulta = true;
    while (controladorConsulta) {
      this.mensagemMenu();
      let opcaoMenuConsulta = readlineSync.questionInt();
      switch (opcaoMenuConsulta){
        case 1:
        case 2:
        case 3:
          await this.#consultaPresenter.run(opcaoMenuConsulta);
          break;
        case 4:
          controladorConsulta = false;
          break
        default:
          throw new Error('\nErro: Opção inválida.')
      }
    } 
    }

  mensagemMenu() {
    console.log('\nAgenda \n 1-Agendar consulta \n 2-Cancelar agendamento \n 3-Listar agenda \n 4-Voltar p/ menu principal \n',);
  }
}
