//Run this code
import readlineSync from 'readline-sync';
import { PacienteService } from './Services/PacienteService.js';

function main() {
  let controlador = true;
  while (controlador == true) {
    const servicePaciente = new PacienteService();
    console.log('Menu Principal');
    //let cpf = readlineSync.question('Digite o CPF do Paciente: ');
    const paciente = servicePaciente.criarPaciente();
    console.log(servicePaciente.cadastroDeCpf(paciente, '06010634300'));
    console.log(paciente);
    controlador = false;
  }
}

main();
