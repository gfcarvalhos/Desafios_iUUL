import { Paciente } from '../Entities/Paciente.js';

export class PacienteService {
  criarPaciente() {
    return new Paciente();
  }

  cadastroDeCpf(paciente, newCPF) {
    return paciente.validaCpf(newCPF);
  }
}
