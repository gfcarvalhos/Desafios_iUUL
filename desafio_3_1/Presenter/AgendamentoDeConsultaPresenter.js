import { ConsultaController } from '../controller/ConsultaController.js';
import { OperationError } from '../controller/OperationError.js';
import { PacienteController } from '../controller/PacienteController.js';
import { AgendamentoDeConsultaView, OperationFailureMessage, OperationResponse } from '../view/AgendamentoDeConsultaView.js';

export class AgendamentoDeConsultaPresenter {
  #agendamentoConsultaView;
  #consultaController;
  #pacienteController;
  #message

  constructor() {
    this.#agendamentoConsultaView = new AgendamentoDeConsultaView();
    this.#consultaController = new ConsultaController();
    this.#pacienteController = new PacienteController();
    this.#message = new OperationFailureMessage();
  }

  async run() {
    //CPF a ser agendada a consulta
    let cpfConsulta = this.#agendamentoConsultaView.leituraDeCpf();
    //Verifica se paciente existe na tabela paciente
    let pacienteExiste = await this.#pacienteController.verificaExistenciaDeCpf(
      newCPF,
    );
    if (!pacienteExiste.status) {
      this.#message.setupMessage(pacienteExiste.message);
    }
    //Chamada para serviço de verificação de CPF no repositorio
    let agendaCpf = this.#consultaController.verificaConsultaPorCpf(cpfConsulta);
    if (agendaCpf.status) {
      this.#message.setupMessage(agendaCpf.message);
    }

    //Data de consulta
    let dataConsulta = this.#agendamentoConsultaView.leituraDataDeConsulta();

    //Hora Inicial
    let horaInicialConsulta = this.#agendamentoConsultaView.leituraHoraInicial(dataConsulta);

    //Hora Final
    let horaFinalConsulta = this.#agendamentoConsultaView.leituraHoraFinal(horaInicialConsulta)

    let newConsulta = await this.#consultaController.registroDeNovaConsulta(
      cpfConsulta,
      dataConsulta,
      horaInicialConsulta,
      horaFinalConsulta
    );

    OperationResponse.setupMessage(newConsulta.status);


  }
}


