export class Consulta {
  #cpf;
  #dataConsulta;
  #horaInicio;
  #horaFim;

  constructor(cpf, dataConsulta, horaInicio, horaFim) {
    this.#cpf = cpf;
    this.#dataConsulta = dataConsulta;
    this.#horaInicio = horaInicio;
    this.#horaFim = horaFim;
  }

  
}
