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
      //Chamando serviço para cria um paciente
      const paciente = servicePaciente.criarPaciente();
      let controladorCadastro = 1;
      while (controladorCadastro <= 3) {
        let newCPF = readlineSync.question('\nCPf:');
        //Chamando serviço de cadastro de CPF com validação
        let cadastroCpf = servicePaciente.cadastroDeCpf(paciente, newCPF);
        if (cadastroCpf == true) {
          controladorCadastro == 1? controladorCadastro++:controladorCadastro;
        } else {
          console.log('\n' + cadastroCpf);
        }
        if (controladorCadastro == 2) {
          let newNome = readlineSync.question('Nome:');
          let cadastroNome = servicePaciente.cadastroDeNome(paciente, newNome);
          if (cadastroNome == true) {
            controladorCadastro++;
          } else {
            console.log('\n' + cadastroNome);
          }
        }
        if (controladorCadastro == 3) {
          let newDataPaciente = readlineSync.question('Data de Nascimento:');
          controladorCadastro++;
        }
      }
      //console.log(servicePaciente.cadastroDeCpf(paciente, '06010634300'));
      //console.log(paciente);
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
