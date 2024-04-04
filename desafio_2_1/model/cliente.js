import { OperationErrors } from '../controller/errorController.js';
import { validaCpf } from '../utils/cpf.js';
import { validaIdade } from '../utils/idade.js';

class Cliente {
  #nome; #cpf; #dataNascimento; #rendaMensal; #estadoCivil; #listaDeErros;

  constructor(nome, cpf, dt_nascimento, renda_mensal = 'nao informado', estado_civil = 'nao informado') {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dt_nascimento;
    this.#rendaMensal = renda_mensal;
    this.#estadoCivil = estado_civil;
  }

  create(dados) {
    let erros = [];

    if (!this.validaNome(dados.nome)) {
      erros.push(OperationErrors.QTD_CARACTERES_FORA_DO_INTERVALO);
    }

    if (!validaCpf(dados.cpf)) {
      erros.push(OperationErrors.CPF_INFORMADO_INVALIDO);
    }

    if (this.validaDataNascimento(dados.dt_nascimento)) {
      if (!validaIdade(dados.dt_nascimento)) {
        erros.push(OperationErrors.IDADE_ABAIXO_DA_MINIMA);
      }
    } else {
      erros.push(OperationErrors.DATA_INVALIDA);
    }

    if(dados.hasOwnProperty('renda_mensal') && !this.validaRendaMensal(dados.renda_mensal)){
      erros.push(OperationErrors.VALOR_RENDA_INVALIDO);
    }

    if(dados.hasOwnProperty('estado_civil') && !this.validaEstadoCivil(dados.estado_civil)){
      erros.push(OperationErrors.ESTADO_CIVIL_INVALIDO);
    }

    return {dados, erros}
  }

  validaNome(nome) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nome) && nome.length >= 5 && nome.length <= 50;
  }

  validaDataNascimento(dataNascimento) {
    //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    return regex.test(dataNascimento);
  }

  validaRendaMensal(renda) {
    const regex = /^\d+(,\d{2})?$/;
    return regex.test(renda);
  }

  validaEstadoCivil(estadoCivil) {
    return (
      estadoCivil == 'C' ||
      estadoCivil == 'c' ||
      estadoCivil == 'S' ||
      estadoCivil == 's' ||
      estadoCivil == 'V' ||
      estadoCivil == 'v' ||
      estadoCivil == 'D' ||
      estadoCivil == 'd'
    );
  }
}

export { Cliente };
