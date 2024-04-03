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
}
