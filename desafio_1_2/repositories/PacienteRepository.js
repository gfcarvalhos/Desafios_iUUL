export class PacienteRepository {
  constructor(...pacientes) {
    this.pacientes = [...pacientes];
  }

  registrarNovoPaciente(newPaciente) {
    this.pacientes.push(newPaciente)
  }
}
