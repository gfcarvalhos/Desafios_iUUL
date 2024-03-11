export class PacienteRepository {
  constructor(...pacientes) {
    this.pacientes = [...pacientes];
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

  verificaCpfExistente(Cpfverifica) {
    return this.pacientes.some(
      (paciente) => paciente[0].cpfPaciente == Cpfverifica,
    );
  }

  buscaPaciente(cpf) {
    let dadosPaciente = this.pacientes.find(
      (paciente) => paciente[0].cpfPaciente == cpf,
    );
    let indexDoPaciente = this.pacientes.findIndex(
      (paciente) => paciente[0].cpfPaciente == cpf,
    );
    return [dadosPaciente, indexDoPaciente];
  }

  exclusaoDePaciente(cpf) {
    let indexPaciente = this.buscaPaciente(cpf)[1];
    if (indexPaciente == -1) {
      return 'Erro: paciente não cadastrado';
    } else {
      this.pacientes.splice(indexPaciente, 1);
      return 'Paciente excluído com sucesso!';
    }
  }
}
