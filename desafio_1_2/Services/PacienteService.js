import { Paciente } from './Entities/Paciente.js';

export class PacienteService {

  constructor(...pacientes) {
    this.pacientes = [...pacientes];
  }

  cadastroDePaciente() {
    this.pacientes
    return new Paciente();
  }

  cadastroDeCpf(newCpf) {
    return;
  }
}
