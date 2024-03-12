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

  registraData(dataParaRegistro) {
    this.#dataConsulta = dataParaRegistro;
  }

  registraHoraInicial(horaParaRegistro) {
    this.#horaInicio = horaParaRegistro;
  }

  registraHoraFinal(horaFinalParaRegistro) {
    this.#horaFim = horaFinalParaRegistro;
  }

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
        this.registraData(dataAgendamento);
        return true;
      } else {
        return 'Erro: Data de agendamento tem que ser superior ou igual à data atual.';
      }
    } else {
      return 'Erro: Data inválida.';
    }
  }

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
    //Validacao da horaInicial
    if (typeof +horaInicial == 'number' && horaInicial.length == 4) {
      const [parteHora, parteMinuto] = [
        horaInicial.slice(0, 2),
        horaInicial.slice(2),
      ];
      if (+parteHora >= 24 || +parteMinuto > 59) {
        return 'Erro: Valor para hora invalido.';
      }
      if (+parteMinuto % 15 != 0) {
        return 'Erro: As horas inicial e final devem ser definidas em intervalos de 15 minutos.';
      }
      if (this.#dataConsulta == dataAtual && +horaInicial < +horaAtual) {
        return 'Erro: A hora inicial é inferior a hora atual.';
      }
      if (+horaInicial < 800 || +horaInicial >= 1900) {
        return 'Erro: A hora inicial deve ser entre 8:00h e 19:00h';
      }
      this.registraHoraInicial(horaInicial);
      return true;
    } else {
      return 'Erro: Valor para hora invalido.';
    }
  }

  validaHoraFinal(horaFinal) {
    if (typeof +horaFinal == 'number' && horaFinal.length == 4) {
      const [parteHora, parteMinuto] = [
        horaFinal.slice(0, 2),
        horaFinal.slice(2),
      ];
      if (+parteHora >= 24 || +parteMinuto > 59) {
        return 'Erro: Valor para hora invalido.';
      }
      if (+horaFinal < 800 || +horaFinal >= 1900) {
        return 'Erro: A hora final deve ser entre 8:00h e 19:00h';
      }
      if (+parteMinuto % 15 != 0) {
        return 'Erro: As horas inicial e final devem ser definidas em intervalos de 15 minutos';
      }
      if (+horaFinal <= +this.#horaInicio) {
        return 'Erro: A hora final deve ser superior à hora inicial';
      }
      this.registraHoraFinal(horaFinal)
      return true
    } else {
      return 'Erro: Valor para hora invalido.';
    }
  }
}
