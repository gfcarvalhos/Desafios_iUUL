export class ConsultaRepository {
  constructor(...consultas) {
    this.consultas = [...consultas];
  }

  registrarNovaConsulta(newConsulta) {
    this.consultas.push(newConsulta);
  }

  validaDataFutura(consulta) {
    let dataAtual = new Date();
    let dataAtualTratada = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      dataAtual.getDate(),
    );
    const [hora, minuto] = [
      dataAtual.getHours().toString(),
      dataAtual.getMinutes().toString(),
    ];
    let horaAtual = hora + minuto;
    let partesDaData = consulta.dataDeConsulta.split('/');
    let dataTratada = new Date(
      partesDaData[2],
      partesDaData[1] - 1,
      partesDaData[0],
    );
    if (
      (dataTratada = dataAtualTratada) &&
      +consulta.horaInicialConsulta >= +horaAtual
    ) {
      return true;
    } else if (dataTratada > dataAtualTratada) {
      return true;
    } else {
      return false;
    }
  }

  filtraConsultasFuturas() {
    let consultasFuturas = this.consultas.filter(
      (consulta) => this.validaDataFutura(consulta) == true,
    );
    return consultasFuturas;
  }

  verificaAgendaPaciente(cpf) {
    return this.filtraConsultasFuturas().some(
      (consulta) => consulta.cpfPacienteConsulta == cpf,
    );
  }

  validaAgendamentoSobrepostoConsulta(consultaEmEspera) {
    return this.consultas.some((consultaRegistrada) => {
      return (+consultaEmEspera.horaInicialConsulta >=
        +consultaRegistrada.horaInicialConsulta &&
        +consultaEmEspera.horaInicialConsulta <
          +consultaRegistrada.horaFinalConsulta);
    });
  }
}
