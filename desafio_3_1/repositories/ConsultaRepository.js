export class ConsultaRepository {
  constructor(...consultas) {
    this.consultas = [...consultas];
  }

  registrarNovaConsulta(newConsulta) {
    this.consultas.push(newConsulta);
  }

  //Verifica se a data da consulta é uma data futura
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
      dataTratada.getTime() == dataAtualTratada.getTime() &&
      +consulta.horaInicialConsulta >= +horaAtual
    ) {
      return true;
    } else if (dataTratada.getTime() > dataAtualTratada.getTime()) {
      return true;
    } else {
      return false;
    }
  }

  /*Filtra a lista de consultas e gera uma lista só com as consultas futuras
  a partir do retorno do método validaDataFutura*/
  filtraConsultasFuturas() {
    let consultasFuturas = this.consultas.filter((consulta) =>
      this.validaDataFutura(consulta),
    );
    return consultasFuturas;
  }

  /*Verifica se o paciente dono do cpf tem alguma consulta futura na lista
  de consultas futuras gerada pelo método filtraConsultasFuturas*/
  verificaAgendaPaciente(cpf) {
    return this.filtraConsultasFuturas().filter((consulta) => {
      return consulta.cpfPacienteConsulta === cpf;
    });
  }

  /*Verifica se a consulta a ser registrada possui o horario de inicio entre
  o horario de inicio e o horario final das outras consultas já registradas
  no mesmo dia. Caso return verdadeiro, significa que a consulta está sobrepondo outras.*/
  validaAgendamentoSobrepostoConsulta(consultaEmEspera) {
    return this.consultas.some((consultaRegistrada) => {
      return (
        consultaRegistrada.dataDeConsulta == consultaEmEspera.dataDeConsulta &&
        +consultaEmEspera.horaInicialConsulta >=
          +consultaRegistrada.horaInicialConsulta &&
        +consultaEmEspera.horaInicialConsulta <
          +consultaRegistrada.horaFinalConsulta
      );
    });
  }

  //Retira da lista de consultas todas as consultas referentes ao cpf do paciente
  exclusaoDeConsultasPassadas(cpf) {
    this.consultas = this.consultas.filter((consulta) => {
      return consulta.cpfPacienteConsulta !== cpf;
    });
  }

  excluiConsulta(cpfPaciente, dataConsulta, hora) {
    //Verifica se existe alguma consulta futura com os dados fornecidos
    let consultasFuturas = this.filtraConsultasFuturas().some((consulta) => {
      return (
        consulta.cpfPacienteConsulta === cpfPaciente &&
        consulta.dataDeConsulta === dataConsulta &&
        consulta.horaInicialConsulta === hora
      );
    });
    //Caso exista consulta futura com os dados, é realizado um filtro e retornado true
    if (consultasFuturas) {
      this.consultas = this.consultas.filter((consulta) => {
        return (
          consulta.cpfPacienteConsulta !== cpfPaciente &&
          consulta.dataDeConsulta !== dataConsulta &&
          consulta.horaInicialConsulta !== hora
        );
      });
      return true;
      //Caso nao exista consultas futuras, retorna false
    } else {
      return false;
    }
  }

  ordenaListaDeConsultas(listaDeConsultas) {
    return listaDeConsultas.sort((a, b) => {
      //Transforma a string em Date()
      let partesDaData1 = a.dataDeConsulta.split('/');
      let data1 = new Date(
        partesDaData1[2],
        partesDaData1[1] - 1,
        partesDaData1[0],
      );
      let partesDaData2 = b.dataDeConsulta.split('/');
      let data2 = new Date(
        partesDaData2[2],
        partesDaData2[1] - 1,
        partesDaData2[0],
      );
      //Compara a data
      if (data1.getTime() !== data2.getTime()) {
        return data1.getTime() - data2.getTime();
      } else {
        //Quando as datas sao iguais, compara as horas
        return +a.horaInicialConsulta - +b.horaInicialConsulta;
      }
    });
  }

  calculaTempoDeConsulta(listaOrdenada) {
    let tempo = [];
    listaOrdenada.forEach((consulta) => {
      //Transforma o horario em minutos MM
      let horaFinalEmMinutos =
        +consulta.horaFinalConsulta.slice(0, 2) * 60 +
        +consulta.horaFinalConsulta.slice(2, 4);
      let horaInicialEmMinutos =
        +consulta.horaInicialConsulta.slice(0, 2) * 60 +
        +consulta.horaInicialConsulta.slice(2, 4);
      //Calcula a diferença em minutos da consulta
      let diferencaMinutos = horaFinalEmMinutos - horaInicialEmMinutos;
      //Calcula a unidade de Horas do tempo de duração da consulta e em seguida a unidade que sobra em minutos
      let tempoHora = Math.floor(diferencaMinutos / 60);
      let tempoMinuto = diferencaMinutos % 60;
      //Tratamento desse resultado para atender ao padrão do retorno ao user
      let [tempoHoraFinal, tempoMinutoFinal] = ['', ''];
      if (tempoHora.toString().length === 2) {
        tempoHoraFinal = tempoHora.toString();
      } else {
        tempoHoraFinal = '0' + tempoHora;
      }
      if (tempoMinuto.toString().length === 2) {
        tempoMinutoFinal = tempoMinuto.toString();
      } else {
        tempoMinutoFinal = '0' + tempoMinuto;
      }
      //salva na lista tempo o tempo de duração da consulta no formato HH:MM
      tempo.push(tempoHoraFinal + ':' + tempoMinutoFinal);
    });
    return tempo;
  }

  listagemTotal() {
    let listaOrdenada = this.ordenaListaDeConsultas(this.consultas);
    let tempoDasConsultas = this.calculaTempoDeConsulta(listaOrdenada);
    return [listaOrdenada, tempoDasConsultas];
  }

  listagemParcial(dataInicio, dataFim) {
    //Tratamento das datas inputadas
    let partesDaDataInicial = dataInicio.split('/');
    let dataInicial = new Date(
      partesDaDataInicial[2],
      partesDaDataInicial[1] - 1,
      partesDaDataInicial[0],
    );
    let partesDaDataFinal = dataFim.split('/');
    let dataFinal = new Date(
      partesDaDataFinal[2],
      partesDaDataFinal[1] - 1,
      partesDaDataFinal[0],
    );
    //Filtragem da lista dentro do intervalo
    let listaNoIntervaloDeData = this.consultas.filter((consulta) => {
      let partesDaData = consulta.dataDeConsulta.split('/');
      let dataConsulta = new Date(
        partesDaData[2],
        partesDaData[1] - 1,
        partesDaData[0],
      );
      return (
        dataConsulta.getTime() >= dataInicial.getTime() &&
        dataConsulta.getTime() <= dataFinal.getTime()
      );
    });
    //Ordena a lista filtrada dentro do intervalo
    let listaNoIntervaloDeDataOrdenada = this.ordenaListaDeConsultas(
      listaNoIntervaloDeData,
    );
    let tempoDasConsultas = this.calculaTempoDeConsulta(
      listaNoIntervaloDeDataOrdenada,
    );
    return [listaNoIntervaloDeDataOrdenada, tempoDasConsultas];
  }
}
