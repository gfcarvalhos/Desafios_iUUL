export class PacienteRepository {
  constructor(...pacientes) {
    this.pacientes = [...pacientes];
  }

  get listaDePacientes() {
    return this.pacientes;
  }

  registrarNovoPaciente(newPaciente) {
    this.pacientes.push(newPaciente);
  }

  listagemDePacientes() {
    // Cabeçalho
    console.log(
      '\n------------------------------------------------------------',
    );
    console.log('CPF         Nome                           Dt.Nasc     Idade');
    console.log('------------------------------------------------------------');

    this.pacientes.forEach((paciente) => {
      console.log(paciente);
      const cpf = paciente[0].cpfPaciente.padEnd(7, ' ');
      const nome = paciente[0].nomePaciente.padEnd(16, ' ');
      const dataNascimento = paciente[0].dataNacimentoPaciente.padStart(
        22,
        ' ',
      );
      const idade = paciente[1].toFixed(0).padStart(5, ' ');
      console.log(`${cpf} ${nome} ${dataNascimento} ${idade}`);
    });
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

  ordenaPorNorme() {
    this.pacientes.sort((a, b) =>
      a[0].nomePaciente.localeCompare(b[0].nomePaciente),
    );
  }

  ordenaPorCpf() {}
}
