export class Consulta {
  #cpf;
  #dataConsulta;
  #horaInicio;
  #horaFim;

  constructor(cpf, dataConsulta, horaInicio, horaFim) {
    this.#cpf = cpf;
    this.#dataConsulta = dataConsulta;
    this.#horaInicio = horaInicio;
    this.#horaFim = horaFim;
  }

  registraCpf(cpfParaRegistro) {
    this.#cpf = cpfParaRegistro;
  }

  validaData(novaData) {
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      let dataAtual = new Date();
      let partesDaData = dataVerificar.split('/');
      let dataAgendamento = new Date(
        partesDaData[2],
        partesDaData[1] - 1,
        partesDaData[0],
      );
      if (dataAgendamento >= dataAtual) {
        return true;
      } else {
        return 'Data de agendamento tem que ser superior ou igual à data atual.';
      }
    } else {
      return 'Data inválida.';
    }
  }
}
