import { Consulta } from '../Entities/Consulta.js'
import { PacienteService } from './PacienteService.js';

export class ConsultaService {
  criarConsulta() {
    return new Consulta();
  }

  verificaCPF(paciente, cpf) {
    let retorno = paciente.encontraPaciente(cpf);
    if (retorno){
      return true;
    } else {
      return 'Erro: paciente não cadastrado'
    }
  }
}
