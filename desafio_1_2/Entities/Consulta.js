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

  get cpfPacienteConsulta() {
    return this.#cpf;
  }

  get dataDeConsulta() {
    return this.#dataConsulta;
  }

  get horaInicialConsulta() {
    return this.#horaInicio;
  }

  get horaFinalConsulta() {
    return this.#horaFim;
  }

  registraCpf(cpfParaRegistro) {
    this.#cpf = cpfParaRegistro;
  }

  registraDataConsulta(dataParaRegistro) {
    this.#dataConsulta = dataParaRegistro;
  }

  registraHoraInicial(horaParaRegistro) {
    this.#horaInicio = horaParaRegistro;
  }

  registraHoraFinal(horaFinalParaRegistro) {
    this.#horaFim = horaFinalParaRegistro;
  }

  /*Verifica se a data está no formato correto de DD/MM/YYYY sendo DD entre 0 e 31 e
  MM entre 0 e 12. Em seguida, tranforma no formato Date() e verifica se é uma data
  futura.*/
  validaData(newData) {
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      let dataAtual = new Date();
      dataAtual = new Date(
        dataAtual.getFullYear(),
        dataAtual.getMonth(),
        dataAtual.getDate(),
      );
      let partesDaData = newData.split('/');
      let dataAgendamento = new Date(
        partesDaData[2],
        partesDaData[1] - 1,
        partesDaData[0],
      );
      if (dataAgendamento >= dataAtual) {
        return true;
      } else {
        return 'Erro: Data de agendamento tem que ser superior ou igual à data atual.';
      }
    } else {
      return 'Erro: Data inválida.';
    }
  }

  /*Trata a data atual. verifica se o input está no formato correto (HHMM) e dentro
  dos limites HH entre 0 e 12 e MM 0 a 59. Verifica se está em um intervalo de 15 minutos.
  Verifica se está dentro*/
  validaHoraInicial(horaInicial) {
    //Tratamento das horas atuais
    let dataAtual = new Date();
    dataAtual = new Date(
      dataAtual.getFullYear(),
      dataAtual.getMonth(),
      dataAtual.getDate(),
    );
    const [hora, minuto] = [
      dataAtual.getHours().toString(),
      dataAtual.getMinutes().toString(),
    ];
    const horaAtual = hora + minuto;
    //Validacao da horaInicial como HHMM
    if (typeof +horaInicial == 'number' && horaInicial.length == 4) {
      const [parteHora, parteMinuto] = [
        horaInicial.slice(0, 2),
        horaInicial.slice(2),
      ];
      //Verifica se estão dentro dos limites HH entre 0 e 12 e MM 0 a 59
      if (+parteHora >= 24 || +parteMinuto > 59) {
        return 'Erro: Valor para hora invalido.';
      }
      //Verifica se está em intervalos de 15 minutos
      if (+parteMinuto % 15 != 0) {
        return 'Erro: As horas inicial e final devem ser definidas em intervalos de 15 minutos.';
      }
      //Verifica se a data é atual e o horario é inferior a atual
      if (this.#dataConsulta == dataAtual && +horaInicial < +horaAtual) {
        return 'Erro: A hora inicial é inferior a hora atual.';
      }
      //Verifica se o horario está entre 8h a 19h
      if (+horaInicial < 800 || +horaInicial >= 1900) {
        return 'Erro: A hora inicial deve ser entre 8:00h e 19:00h';
      }
      return true;
    } else {
      return 'Erro: Valor para hora invalido.';
    }
  }

  validaHoraFinal(horaFinal) {
    //Validacao da horaInicial como HHMM
    if (typeof +horaFinal == 'number' && horaFinal.length == 4) {
      const [parteHora, parteMinuto] = [
        horaFinal.slice(0, 2),
        horaFinal.slice(2),
      ];
      //Verifica se estão dentro dos limites HH entre 0 e 12 e MM 0 a 59
      if (+parteHora >= 24 || +parteMinuto > 59) {
        return 'Erro: Valor para hora invalido.';
      }
      //Verifica se o horario está entre 8h a 19h
      if (+horaFinal < 800 || +horaFinal >= 1900) {
        return 'Erro: A hora final deve ser entre 8:00h e 19:00h';
      }
      //Verifica se está em intervalos de 15 minutos
      if (+parteMinuto % 15 != 0) {
        return 'Erro: As horas inicial e final devem ser definidas em intervalos de 15 minutos';
      }
      //Verifica se a hora final né menor que a hora inicial
      if (+horaFinal <= +this.#horaInicio) {
        return 'Erro: A hora final deve ser superior à hora inicial';
      }
      return true;
    } else {
      return 'Erro: Valor para hora invalido.';
    }
  }
}
