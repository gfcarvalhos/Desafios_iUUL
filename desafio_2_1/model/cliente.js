class Cliente {
  #nome;
  #cpf;
  #dataNascimento;
  #rendaMensal;
  #estadoCivil;

  constructor(nome, cpf, dataNascimento, rendaMensal, estadoCivil) {
    this.#nome = nome;
    this.#cpf = cpf;
    this.#dataNascimento = dataNascimento;
    this.#rendaMensal = rendaMensal;
    this.#estadoCivil = estadoCivil;
  }

  validaNome(nome){
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(newNome) && newNome.length >= 5 && newNome.length <= 50;
  }

  validaCpf(cpf){}

  validaDataNascimento(dataNascimento){}

  validaRendaMensal(renda){}

  validaEstadoCivil(estadoCivil){}
  
}

export {Cliente}