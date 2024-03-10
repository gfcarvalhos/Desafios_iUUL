//Run this code
import readlineSync from 'readline-sync';
import { PacienteService } from './Services/PacienteService.js';

function menuPaciente() {
  let controladorPaciente = true;
  while (controladorPaciente) {
    let menuPaciente = readlineSync.questionInt(
      '\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) \n 5-Voltar p/ menu principal \n',
    );
    //Cadastro de novo paciente
    if (menuPaciente == 1) {
      const servicePaciente = new PacienteService();
      //Chamada para serviço de criação de paciente
      const paciente = servicePaciente.criarPaciente();
      let controladorCadastro = 1;
      while (controladorCadastro <= 3) {
        if (controladorCadastro == 1) {
          let newCPF = readlineSync.question('\nCPf:');
          //Chamada para serviço de validacao e cadastro do CPF do paciente
          let cadastroCpf = servicePaciente.cadastroDeCpf(paciente, newCPF);
          if(cadastroCpf == true){
            controladorCadastro++;
          } else {
            console.log('\n' + cadastroCpf);
          }
        }
        if (controladorCadastro == 2) {
          let newNome = readlineSync.question('Nome:');
          //Chamada para serviço de validacao e cadastro do nome do paciente
          let cadastroNome = servicePaciente.cadastroDeNome(paciente, newNome);
          if (cadastroNome == true) {
            controladorCadastro++;
          } else {
            console.log('\n' + cadastroNome + '\n');
          }
        }
        if (controladorCadastro == 3) {
          let newDataPaciente = readlineSync.question('Data de Nascimento:');
          let cadastroDataNascimento = servicePaciente.cadastroDeDataNascimento(paciente, newDataPaciente)
          if (cadastroDataNascimento == true) {
            controladorCadastro++;
          } else {
            console.log('\n' + cadastroDataNascimento + '\n');
          }
        }
      }
    }
    if (menuPaciente == 2) {
      controladorPaciente = false;
    }
    if (menuPaciente == 3) {
      controladorPaciente = false;
    }
    if (menuPaciente == 4) {
      controladorPaciente = false;
    }
    if (menuPaciente == 5) {
      controladorPaciente = false;
    }
  }
}

function main() {
  let controlador = true;
  while (controlador) {
    let menuPrincipal = readlineSync.questionInt(
      '\nMenu Principal \n 1-Cadastro de pacientes \n 2-Agenda \n 3-Fim \n',
    );
    if (menuPrincipal == 1) {
      menuPaciente();
    }
    if (menuPrincipal == 2) {
      controlador = false;
    }
    if (menuPrincipal == 3) {
      controlador = false;
    }
  }
}

main();
