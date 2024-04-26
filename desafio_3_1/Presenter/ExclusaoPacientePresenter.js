export class ExclusaoPacientePresenter {
  #viewNovoPaciente;
  #pacienteService;
  #messageFailure;

  constructor() {
    this.#viewNovoPaciente = new CadastroNovoPacienteView();
    this.#pacienteService = new PacienteService();
    this.#messageFailure = new OperationFailureMessage();
  }

  run() {
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
}
