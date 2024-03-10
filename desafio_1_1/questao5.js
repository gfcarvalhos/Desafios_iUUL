//Gabriel Felipe Carvalho Silva
import readlineSync from 'readline-sync';

class Cliente {
  constructor(nome, cpf, dataNascimento, renda, estadoCivil, dependentes) {
    this.nome = nome;
    this.cpf = cpf;
    this.dataNascimento = dataNascimento;
    this.renda = renda;
    this.estadoCivil = estadoCivil;
    this.dependentes = dependentes;
  }

  validaNome(newNome) {
    if (typeof newNome == 'string' && newNome.length >= 5) {
      this.nome = newNome;
      return false;
    } else {
      return true;
    }
  }

  validaCPF(newCpf) {
    if (typeof +newCpf == 'number' && newCpf.length == 11) {
      this.cpf = newCpf
        .toString(10)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
      return false;
    } else {
      return true;
    }
  }

  validaIdade(dataVerificar) {
    let partesDaData = dataVerificar.split('/');
    let dataNascimento = new Date(
      partesDaData[2],
      partesDaData[1] - 1,
      partesDaData[0],
    );
    let dataAtual = new Date();
    //Verifica idade
    let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
    let mesAtual = dataAtual.getMonth();
    let mesNascimento = dataNascimento.getMonth();
    if (
      mesAtual < mesNascimento ||
      (mesAtual == mesNascimento &&
        dataAtual.getDate() < dataNascimento.getDate())
    ) {
      idade--;
    }
    return idade;
  }

  validaData(newData) {
    const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/(\d{4}))$/
    const idade = this.validaIdade(newData);
    if (regex.test(newData)) {
      if (idade >= 18) {
        this.dataNascimento = newData;
        return [false, 0];
      } else {
        return [true, 2];
      }
    } else {
      return [true, 1];
    }
  }
  validaRenda(newRenda) {
    newRenda = newRenda.replace(',', '.');
    if (typeof +newRenda == 'number') {
      newRenda = parseFloat(newRenda).toFixed(2);
      this.renda = parseFloat(newRenda);
      return false;
    } else {
      return true;
    }
  }

  validaEstadoCivil(newEstadoCivil) {
    const estados = ['C', 'V', 'D', 'S', 'c', 'v', 'd', 's'];
    if (estados.some((estado) => estado == newEstadoCivil)) {
      this.estadoCivil = newEstadoCivil;
      return false;
    } else {
      return true;
    }
  }

  validaDependente(newDependente) {
    const inteiro = /^\d+$/;
    if (inteiro.test(newDependente)) {
      newDependente = parseInt(newDependente);
      if (newDependente < 0 || newDependente > 10) {
        return true;
      } else {
        this.dependentes = newDependente;
        return false;
      }
    } else {
      return true;
    }
  }

  get dadosCliente() {
    return [this.nome];
  }
}

function main() {
  let cliente = new Cliente();
  let invalidaData = 0;
  console.log('Informe os dados do cliente:\n');
  let mediador = true;
  while (mediador == true) {
    let nome = readlineSync.question('Digite o nome do cliente: ');
    mediador = cliente.validaNome(nome, cliente);
    if (mediador == true) {
      console.log('O nome deve possuir no mínimo 5 caracteres.\n');
    }
  }
  mediador = true;
  while (mediador == true) {
    let cpf = readlineSync.question(
      'Digite o CPF do cliente (apenas numeros): ',
    );
    mediador = cliente.validaCPF(cpf);
    if (mediador == true) {
      console.log('O CPF informado não possui 11 dígitos.\n');
    }
  }
  mediador = true;
  while (mediador == true) {
    let cpf = readlineSync.question(
      'Digite a data de nascimento do cliente (DD/MM/YYYY): ',
    );
    [mediador, invalidaData] = cliente.validaData(cpf);
    if (mediador == true) {
      if (invalidaData == 1) {
        console.log('Formato da data está incorreto.\n');
      } else {
        console.log('Cliente com idade inferior a 18 anos.\n');
      }
    }
  }

  mediador = true;
  while (mediador == true) {
    let renda = readlineSync.question('Digite a renda do cliente: ');
    mediador = cliente.validaRenda(renda);
    if (mediador == true) {
      console.log('O valor informado não é um número válido.\n');
    }
  }

  mediador = true;
  while (mediador == true) {
    let estadoCivil = readlineSync.question(
      'Digite o estado civil do cliente (C, S, V ou D): ',
    );
    mediador = cliente.validaEstadoCivil(estadoCivil);
    if (mediador == true) {
      console.log('Código para estado civil inválido.\n');
    }
  }

  mediador = true;
  while (mediador == true) {
    let dependente = readlineSync.question(
      'Digite a quantidade de dependentes do cliente (0 a 10): ',
    );
    mediador = cliente.validaDependente(dependente);
    if (mediador == true) {
      console.log('Valor informado inválido.\n');
    }
  }
  console.log();
  console.log(cliente);
}

main();
