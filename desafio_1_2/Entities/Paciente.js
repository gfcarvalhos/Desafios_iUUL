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

  validaCpf(newCpf){
    try{
      if(typeof +newCpf == 'number' && newCpf.length == 11){

      }
    } catch {
      throw new Error("CPF inválido.")
    }

  }
}
