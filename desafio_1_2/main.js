//Run this code
import readlineSync from 'readline-sync';
import { PacienteService } from './Services/PacienteService.js';

function menuPaciente(){
  let controladorPaciente = readlineSync.questionInt('\nMenu do Cadastro de Paciente \n 1-Cadastrar novo paciente \n 2-Excluir paciente \n 3-Listar pacientes (ordenado por CPF) \n 4-Listar pacientes (ordenado por nome) 5-Voltar p/ menu principal');
  if(controladorPaciente == 1){
    const servicePaciente = new PacienteService();
    //let cpf = readlineSync.question('Digite o CPF do Paciente: ');
    const paciente = servicePaciente.criarPaciente();
    console.log(servicePaciente.cadastroDeCpf(paciente, '06010634300'));
    console.log(paciente);
  }
}

function main() {
  let controlador = true;
  while (controlador == true) {
    let menuPrincipal = readlineSync.questionInt('Menu Principal \n 1-Cadastro de pacientes \n 2-Agenda \n 3-Fim');
    if(menuPrincipal == 1){
      menuPaciente();
    }
    if(menuPrincipal == 2){
      controlador = false;
    }
    if(menuPrincipal == 3){
      controlador = false;
    }
  }
}

main();
