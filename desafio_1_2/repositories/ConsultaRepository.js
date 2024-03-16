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
      dataTratada == dataAtualTratada &&
      +consulta.horaInicialConsulta >= +horaAtual
    ) {
      return true;
    } else if (dataTratada > dataAtualTratada) {
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
  o horario de inicio e o horario final das outras consultas já registradas.
  Caso return verdadeiro, significa que a consulta está sobrepondo outras.*/
  validaAgendamentoSobrepostoConsulta(consultaEmEspera) {
    return this.consultas.some((consultaRegistrada) => {
      return (
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

  listagemDeConsultas() {
    // Cabeçalho
    console.log(
      '\n------------------------------------------------------------',
    );
    console.log('CPF         Data                          HrInicio     HrFim');
    console.log('------------------------------------------------------------');

    this.consultas.forEach((consulta) => {
      const cpf = consulta.cpfPacienteConsulta.padEnd(7, ' ');
      const data = consulta.dataDeConsulta.padEnd(16, ' ');
      const hrInicial = consulta.horaInicialConsulta.padStart(22, ' ');
      const hrFinal = consulta.horaFinalConsulta.padStart(5, ' ');
      console.log(`${cpf} ${data} ${hrInicial} ${hrFinal}`);
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
}
