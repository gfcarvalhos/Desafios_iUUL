import { OperationError, OperationStatus } from '../controller/OperationError.js';
import { ConsultaSchema } from '../models/ConsultaSchema.js';
import { Op } from 'sequelize';

export class Consulta {
  #pacienteCpf;
  #dataConsulta;
  #horaInicio;
  #horaFim;
  #duracao;

  constructor(cpf, dataConsulta, horaInicio, horaFim, duracao) {
    this.#pacienteCpf = cpf;
    this.#dataConsulta = dataConsulta;
    this.#horaInicio = horaInicio;
    this.#horaFim = horaFim;
    this.#duracao = duracao;
  }

  get cpfPacienteConsulta() {
    return this.#pacienteCpf;
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

  async buscaConsultasPorCpf(cpf){
    try {
      const retornoDeBuscaPorCpf = await ConsultaSchema.findAll({
        where: {
          pacienteCpf: cpf,
        },
      });
      if (retornoDeBuscaPorCpf == null) {
        return OperationStatus.FAILURE;
      } else {
        const retornoConsultasPorCpf = Consulta.criaConsulta(retornoDeBuscaPorCpf)
        return retornoConsultasPorCpf;
      }
    } catch (erro) {
      throw new Error(OperationError.UNEXPECTED_ERROR);
    }
  }   

  async buscaConsultaFuturaPorCpf(cpf) {
    try {
      const retornoDeBuscaPorCpf = await ConsultaSchema.findAll({
        where: {
          pacienteCpf: cpf,
        },
      });
      if (retornoDeBuscaPorCpf == null) {
        return OperationStatus.FAILURE;
      } else {
        const validaConsultaFutura = this.verificaDataFutura(retornoDeBuscaPorCpf)
        return validaConsultaFutura
      }
    } catch (erro) {
      throw new Error(OperationError.UNEXPECTED_ERROR);
    }
  }

  verificaDataFutura(dados){
    const dataAtual = new Date();
    if(Array.isArray(dados)){
      let controle = false;
      dados.forEach(dado => {
        const [dia, mes, ano] = dado.dataDeConsulta.split('/');
        data = new Date(ano, mes -1, dia)
        if(data > dataAtual){
          return true;
        }
      })
      return controle;
    } else {
      const [dia, mes, ano] = dados.dataDeConsulta.split('/');
      data = new Date(ano, mes -1, dia)
        return data > dataAtual;
    }
  }

  /**
   * Verifica se a consulta a ser registrada possui o horario de inicio entre
  o horario de inicio e o horario final das outras consultas já registradas
  no mesmo dia. Caso return verdadeiro, significa que a consulta está sobrepondo outras.
  */
  async validaAgendamentoSobrepostoConsulta(dataConsultaPendente, horaInicialPendente) {
    try{
      const ConsultasDoDia = []
      const retornoDeBuscaPorData = await ConsultaSchema.findAll({
        where: {
          dataConsulta: dataConsultaPendente,
        },
      });
      if (retornoDeBuscaPorData == null) {//Zero consultas no dia
        return OperationStatus.FAILURE;
      } else if (Array.isArray(retornoDeBuscaPorData)){ //Mais de uma consulta no dia
        ConsultasDoDia = Consulta.criaConsulta(retornoDeBuscaPorData)
      } else { //Uma unica consulta no dia
        ConsultasDoDia.append(Consulta.criaConsulta(retornoDeBuscaPorData))
      }
  
      return ConsultasDoDia.some((consultaRegistrada) => {
        return (
          consultaRegistrada.dataDeConsulta == dataConsultaPendente &&
          +horaInicialPendente >=
            +consultaRegistrada.horaInicialConsulta &&
          +horaInicialPendente <
            +consultaRegistrada.horaFinalConsulta
        );
      });
    } catch (erro){
      throw new Error(OperationError.UNEXPECTED_ERROR);
    }
  }


  static criaConsulta(dados){
    return dados.map(dado => new Consulta(dado.cpfPaciente, dado.dataConsulta, dado.horaInicio, dado.horaFim, dado.duracao));
  }

  static validaDataQualquer(newData) {
    //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      return true;
    } else {
      return false;
    }
  }
}
