//Run this code
import readlineSync from 'readline-sync';
import { PacienteService } from './Services/PacienteService.js';
import { ConsultaService } from './Services/ConsultaService.js';

function menuPaciente(servicePaciente) {
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
          let newCPF = readlineSync.question('\nCPf:');
          //Chamada para serviço de validacao e cadastro do CPF do paciente
          let cadastroCpf = servicePaciente.cadastroDeCpf(paciente, newCPF);
          //Verifica se passou pela validacao e foi criado na instancia de paciente, caso nao
          //retorna o erro
          if (cadastroCpf == true) {
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
          let cadastroDataNascimento = servicePaciente.cadastroDeDataNascimento(
            paciente,
            newDataPaciente,
          );
          if (cadastroDataNascimento == true) {
            controladorCadastro++;
            console.log('\n' + servicePaciente.cadastroFinal(paciente));
            servicePaciente.listagemDePacientesPorNome();
          } else {
            console.log('\n' + cadastroDataNascimento + '\n');
          }
        }
      }
    }
    if (menuPaciente == 2) {
      let cpfPaciente = readlineSync.question('\nCPf:');
      let exclusaoDePaciente = servicePaciente.exclusaoPaciente(cpfPaciente);
      console.log('\n' + exclusaoDePaciente);
      servicePaciente.listagemDePacientesPorNome();
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

function menuAgenda(serviceConsulta, servicePaciente) {
  let controladorConsulta = true;
  while (controladorConsulta) {
    let menuConsulta = readlineSync.questionInt(
      '\nAgenda \n 1-Agendar consulta \n 2-Cancelar agendamento \n 3-Listar agenda \n 4-Voltar p/ menu principal \n',
    );

    if (menuConsulta == 1) {
      //Chamada para serviço de criação de consulta (agendamento)
      const paciente = serviceConsulta.criarConsulta();
      let controladorAgendamento = 1;
      while (controladorAgendamento <= 3) {
        if (controladorAgendamento == 1) {
          let cpfConsulta = readlineSync.question('\nCPf:');
          //Chamada para serviço de verificação de CPF no repositorio
          let agendaCpf = serviceConsulta.verificaCPF(servicePaciente, cpfConsulta);
          if (agendaCpf == true) {
            controladorAgendamento++;
          } else {
            console.log('\n' + agendaCpf);
          }
        }
        if (controladorAgendamento == 2) {
          let newNome = readlineSync.question('Data da consulta:');
          //Chamada para serviço de validacao e cadastro do nome do paciente
          let cadastroNome = servicePaciente.cadastroDeNome(paciente, newNome);
          if (cadastroNome == true) {
            controladorAgendamento++;
          } else {
            console.log('\n' + cadastroNome + '\n');
          }
        }
        if (controladorAgendamento == 3) {
          let newDataPaciente = readlineSync.question('Data de Nascimento:');
          let cadastroDataNascimento = servicePaciente.cadastroDeDataNascimento(
            paciente,
            newDataPaciente,
          );
          if (cadastroDataNascimento == true) {
            controladorAgendamento++;
            console.log('\n' + servicePaciente.cadastroFinal(paciente));
            servicePaciente.listagemDePacientesPorNome();
          } else {
            console.log('\n' + cadastroDataNascimento + '\n');
          }
        }
      }
    }
    if (menuConsulta == 2) {
    }

    if (menuConsulta == 3) {
    }

    if (menuConsulta == 4) {
    }
  }
}

function main() {
  let controlador = true;
  //Iniciando serviços
  const servicePaciente = new PacienteService();
  const serviceConsulta = new ConsultaService();
  while (controlador) {
    let menuPrincipal = readlineSync.questionInt(
      '\nMenu Principal \n 1-Cadastro de pacientes \n 2-Agenda \n 3-Fim \n',
    );
    if (menuPrincipal == 1) {
      menuPaciente(servicePaciente);
    }
    if (menuPrincipal == 2) {
      menuAgenda(serviceConsulta, servicePaciente);
    }
    if (menuPrincipal == 3) {
      controlador = false;
    }
  }
}

main();
