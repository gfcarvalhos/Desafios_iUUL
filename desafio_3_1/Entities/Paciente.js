export class Paciente {
  #nome;
  #cpf;
  #dataNascimento;

  constructor(nome, cpf, dataNacimento) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNacimento;
  }

  get nomePaciente() {
    return this.#nome;
  }

  get cpfPaciente() {
    return this.#cpf;
  }

  get dataNacimentoPaciente() {
    return this.#dataNascimento;
  }

  registraNome(nome) {
    this.#nome = nome;
  }

  registraCpf(cpf) {
    this.#cpf = cpf;
  }

  registraDataNascimento(dataNascimento) {
    this.#dataNascimento = dataNascimento;
  }

  static validaCpf(newCpf) {
    try {
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
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    } catch (error) {
      console.error;
      ('CPF inválido.');
    }
  }

  static validaNome(newNome) {
    const regex = /^[a-zA-Z\s]+$/;
    if (regex.test(newNome) && newNome.length >= 5) {
      return true;
    } else {
      return false;
    }
  }

  static validaIdade(dataVerificar) {
    //divide a string e transforma em Date()
    let partesDaData = dataVerificar.split('/');
    let dataNascimento = new Date(
      partesDaData[2],
      partesDaData[1] - 1,
      partesDaData[0],
    );
    let dataAtual = new Date();
    //Verifica idade pela diferença de anos
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let mesNascimento = dataNascimento.getMonth();
    //Verifica se no ano corrente o paciente já fez aniversario. Caso nao, diminui em 1 a data
    //calculada entre a diferença de anos
    if (
      mesAtual < mesNascimento ||
      (mesAtual == mesNascimento &&
        dataAtual.getDate() < dataNascimento.getDate())
    ) {
      idade--;
    }
    return idade;
  }

  static validaData(newData) {
    //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/;
    //Valida se está de acordo com DD/MM/YYYY
    if (regex.test(newData)) {
      //Chamada para verificar a idade do paciente
      const idade = this.validaIdade(newData);
      if (idade >= 13) {
        return [true, 0];
      } else {
        return [false, 2];
      }
    } else {
      return [false, 1];
    }
  }
}
