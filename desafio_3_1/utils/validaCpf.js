import { OperationError, OperationStatus } from "../controller/OperationError.js";

export function validaCpf(newCpf) {
    //Valida se o input foi de apenas numeros e se o tamanho é 11
    if (typeof +newCpf == 'number' && newCpf.length == 11) {
      //Verifica se sao todos numeros iguais
      let contador = 0;
      for (let i = 0; i < newCpf.length; i++) {
        if (newCpf[i] == newCpf[0]) contador++;
      }
      //Verifica o calculo do digito J e G
      let valorJLista = [];
      let valorGLista = [];
      let contadorRegressivo = 11;
      //Gera uma lista com a multiplicação dígitos do CPF com as constantes
      for (let i = 0; i < newCpf.length - 1; i++) {
        if (i <= 9 && contadorRegressivo < 11) {
          valorJLista.push(contadorRegressivo * newCpf[i]);
        }
        valorGLista.push(contadorRegressivo * newCpf[i]);
        contadorRegressivo--;
      }
      //Resto da divisao da soma dos valores dos 9 digitos por 11
      let valorJTotal =
        valorJLista.reduce((valor, total) => valor + total) % 11;
      let valorJ =
        valorJTotal == 0 || valorJTotal == 1 ? 0 : 11 - valorJTotal;
      let valorGTotal =
        valorGLista.reduce((valor, total) => valor + total) % 11;
      let valorG =
        valorGTotal == 0 || valorGTotal == 1 ? 0 : 11 - valorGTotal;
      if (contador != 11 && valorJ == +newCpf[9] && valorG == +newCpf[10]) {
        return {status: OperationStatus.SUCCESS};
      } else {
        return {status: OperationStatus.FAILURE, message: OperationError.CPF_INVALID};
      }
    } else {
      return {status: OperationStatus.FAILURE, message: OperationError.CPF_INVALID};
    } 
}