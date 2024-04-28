import { OperationError, OperationStatus } from "../controller/OperationError";

/**
 * Valida a hora inicial: verifica se o input está no formato correto (HHMM) e dentro
  dos limites HH entre 0 e 12 e MM 0 a 59. Verifica todas as condições de negocio.
  */
export function validaHoraInicial(horaInicial, dataConsulta) {
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
      return {status: OperationStatus.FAILURE, message: OperationError.INVALID_DATE};
    }
    //Verifica se está em intervalos de 15 minutos
    if (+parteMinuto % 15 != 0) {
      return {status: OperationStatus.FAILURE, message: OperationError.OUT_OF_MINUTES_RANGE}
    }
    //Verifica se a data é atual e o horario é inferior a atual
    if (dataConsulta == dataAtual && +horaInicial < +horaAtual) {
      return {status: OperationStatus.FAILURE, message: OperationError.PAST_HOUR_NOT_ALLOWED}
    }
    //Verifica se o horario está entre 8h a 19h
    if (+horaInicial < 800 || +horaInicial >= 1900) {
      return {status: OperationStatus.FAILURE, message: OperationError.OUT_OF_OPENING_HOURS}
    }
    return {status: OperationStatus.SUCCESS};
  } else {
    return {status: OperationStatus.FAILURE, message: OperationError.INVALID_DATE};
  }
}

/**
 * Valida a hora final: verifica se o input está no formato correto (HHMM) e dentro
  dos limites HH entre 0 e 12 e MM 0 a 59. Verifica todas as condições de negocio.
  */
export function validaHoraFinal(horaFinal, horaInicio) {
  //Validacao da horaInicial como HHMM
  if (typeof +horaFinal == 'number' && horaFinal.length == 4) {
    const [parteHora, parteMinuto] = [
      horaFinal.slice(0, 2),
      horaFinal.slice(2),
    ];
    //Verifica se estão dentro dos limites HH entre 0 e 12 e MM 0 a 59
    if (+parteHora >= 24 || +parteMinuto > 59) {
      return {status: OperationStatus.FAILURE, message: OperationError.INVALID_DATE};
    }
    //Verifica se o horario está entre 8h a 19h
    if (+horaFinal < 800 || +horaFinal >= 1900) {
      return {status: OperationStatus.FAILURE, message: OperationError.OUT_OF_OPENING_HOURS}
    }
    //Verifica se está em intervalos de 15 minutos
    if (+parteMinuto % 15 != 0) {
      return {status: OperationStatus.FAILURE, message: OperationError.OUT_OF_MINUTES_RANGE}
    }
    //Verifica se a hora final é menor que a hora inicial
    if (+horaFinal <= horaInicio) {
      return {status: OperationStatus.FAILURE, message: OperationError.LOWER_THAN_INITIAL_HOUR}
    }
    return {status: OperationStatus.SUCCESS};
  } else {
    return {status: OperationStatus.FAILURE, message: OperationError.INVALID_DATE};
  }
}
