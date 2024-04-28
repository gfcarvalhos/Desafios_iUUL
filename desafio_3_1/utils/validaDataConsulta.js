import { OperationError, OperationStatus } from "../controller/OperationError";

  /**
   * Verifica se a data está no formato correto de DD/MM/YYYY sendo DD entre 0 e 31 e
  MM entre 0 e 12. Em seguida, tranforma no formato Date() e verifica se é uma data
  futura.
  */
export function validaData(newData) {
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
        return {status: OperationStatus.SUCCESS};
      } else {
        return {status: OperationStatus.FAILURE, message: OperationError.PAST_DATE_NOT_ALLOWED};
      }
    } else {
      return {status: OperationStatus.FAILURE, message: OperationError.INVALID_DATE};
    }
  }