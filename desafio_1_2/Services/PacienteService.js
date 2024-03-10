import { Paciente } from '../Entities/Paciente.js';

export class PacienteService {
  criarPaciente() {
    return new Paciente();
  }

  cadastroDeCpf(paciente, newCPF) {
    let retornoCpf = paciente.validaCpf(newCPF);
    if(retornoCpf){
      return true
    } else {
      return 'Erro: CPF inválido.'
    }
  }
}
