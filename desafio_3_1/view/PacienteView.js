export class PacienteView {
  menuPrincipalPaciente() {
    console.log('menu paciente')
  /*  let controladorPaciente = true;
    while (controladorPaciente) {
      this.mensagemMenu();
      let menuPaciente = readlineSync.questionInt();
      console.log(menuPaciente);
    }*/
  }

  mensagemMenu() {
    return '\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) \n 5-Voltar p/ menu principal \n';
  }
}

function menuPaciente(servicePaciente, serviceConsulta) {
  let controladorPaciente = true;
  while (controladorPaciente) {
    let menuPaciente = readlineSync.questionInt(
      '\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) \n 5-Voltar p/ menu principal \n',
    );
    //Cadastro de novo paciente
    if (menuPaciente == 1) {
      //Chamada para serviço de criação de paciente
      const paciente = servicePaciente.criarPaciente();
      let controladorCadastro = 1;
      while (controladorCadastro <= 3) {
        if (controladorCadastro == 1) {
          let newCPF = readlineSync.question('\nCPF:');
          //Chamada para serviço de validacao e cadastro do CPF do paciente
          let validaCpf = servicePaciente.validaCpfPaciente(newCPF);
          /*Verifica se passou pela validacao e  cria na instancia de paciente, caso nao
          retorna o erro*/
          if (validaCpf === true) {
            servicePaciente.registraCpfPaciente(paciente, newCPF);
            controladorCadastro++;
          } else {
            console.log('\n' + validaCpf);
          }
        }
        if (controladorCadastro == 2) {
          let newNome = readlineSync.question('Nome:');
          //Chamada para serviço de validacao e cadastro do nome do paciente
          let cadastroNome = servicePaciente.validaNomePaciente(newNome);
          /*Verifica se passou pela validacao e cria na instancia de paciente, caso nao
          retorna o erro*/
          if (cadastroNome == true) {
            servicePaciente.registraNomePaciente(paciente, newNome);
            controladorCadastro++;
          } else {
            console.log('\n' + cadastroNome + '\n');
          }
        }
        if (controladorCadastro == 3) {
          let newDataPaciente = readlineSync.question('Data de Nascimento:');
          let cadastroDataNascimento =
            servicePaciente.validaDataNascimentoPaciente(newDataPaciente);
          /*Verifica se passou pela validacao e cria na instancia de paciente, caso nao
          retorna o erro. Também salva no repositorio a instancia atual de Paciente como obj*/
          if (cadastroDataNascimento == true) {
            servicePaciente.registraDataNascimentoPaciente(
              paciente,
              newDataPaciente,
            );
            controladorCadastro++;
            console.log('\n' + servicePaciente.cadastroFinal(paciente));
          } else {
            console.log('\n' + cadastroDataNascimento + '\n');
          }
        }
      }
    }
    if (menuPaciente == 2) {
      let cpfPaciente = readlineSync.question('\nCPF:');
      let exclusaoDePaciente = servicePaciente.exclusaoPaciente(
        cpfPaciente,
        serviceConsulta,
      );
      if (exclusaoDePaciente == true) {
        console.log('\n Paciente excluído com sucesso! \n');
      } else {
        console.log('\n' + exclusaoDePaciente + '\n');
      }
    }
    if (menuPaciente == 3) {
      servicePaciente.listagemDePacientes(serviceConsulta, 2);
    }
    if (menuPaciente == 4) {
      servicePaciente.listagemDePacientes(serviceConsulta, 1);
    }
    if (menuPaciente == 5) {
      controladorPaciente = false;
    }
  }
}
