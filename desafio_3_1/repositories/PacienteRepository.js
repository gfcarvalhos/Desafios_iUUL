import { OperationStatus } from '../controller/OperationError.js';
import { PacienteSchema } from '../models/PacienteSchema.js';

export class PacienteRepository extends PacienteSchema {
  constructor(...pacientes) {
    super();
    this.pacientes = [...pacientes];
  }

  get listaDePacientes() {
    return this.pacientes;
  }

  registrarNovoPaciente(newPaciente) {
    PacienteSchema.create(newPaciente);
    return { status: OperationStatus.SUCCESS };
  }

  //Verifica se há pacientes cadastrados com o cpf informado pelo user
  verificaCpfExistente(Cpfverifica) {
    return this.pacientes.some(
      (paciente) => paciente[0].cpfPaciente == Cpfverifica,
    );
  }

  //Busca os dados do paciente o index na lista de pacientes mediante o cpf informado
  buscaPaciente(cpf) {
    let dadosPaciente = this.pacientes.find(
      (paciente) => paciente[0].cpfPaciente == cpf,
    );
    let indexDoPaciente = this.pacientes.findIndex(
      (paciente) => paciente[0].cpfPaciente == cpf,
    );
    return [dadosPaciente, indexDoPaciente];
  }

  //Utiliza o index informado pelo metodo buscaPaciente() para excluir o paciente
  //da lista de cadastrados
  exclusaoDePaciente(cpf) {
    let indexPaciente = this.buscaPaciente(cpf)[1];
    if (indexPaciente == -1) {
      return false;
    } else {
      this.pacientes.splice(indexPaciente, 1);
      return true;
    }
  }

  //Ordena por nome do paciente de A a Z: objeto no indice 0 da lista Paciente
  ordenaPorNorme() {
    this.pacientes.sort((a, b) =>
      a[0].nomePaciente.localeCompare(b[0].nomePaciente),
    );
  }

  //Ordena por cpf do paciente em ordem crescente: objeto no indice 0 da lista Paciente
  ordenaPorCpf() {
    this.pacientes.sort((a, b) => {
      let compara = parseInt(a[0].cpfPaciente) - parseInt(b[0].cpfPaciente);
      if (compara < 0) {
        return -1;
      } else if (compara > 0) {
        return 1;
      } else return 0;
    });
  }
}
