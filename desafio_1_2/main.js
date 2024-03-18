import readlineSync from 'readline-sync';
import { PacienteService } from './Services/PacienteService.js';
import { ConsultaService } from './Services/ConsultaService.js';

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

function menuAgenda(serviceConsulta, servicePaciente) {
  let controladorConsulta = true;
  while (controladorConsulta) {
    let menuConsulta = readlineSync.questionInt(
      '\nAgenda \n 1-Agendar consulta \n 2-Cancelar agendamento \n 3-Listar agenda \n 4-Voltar p/ menu principal \n',
    );
    if (menuConsulta == 1) {
      //Chamada para serviço de criação de consulta (agendamento)
      const consulta = serviceConsulta.criarConsulta();
      let controladorAgendamento = 1;
      while (controladorAgendamento <= 4) {
        if (controladorAgendamento == 1) {
          let cpfConsulta = readlineSync.question('\nCPF:');
          //Chamada para serviço de verificação de CPF no repositorio
          let agendaCpf = serviceConsulta.verificaCPF(
            servicePaciente,
            cpfConsulta,
            1,
          );
          if (agendaCpf == true) {
            serviceConsulta.registraCpfService(cpfConsulta, consulta);
            controladorAgendamento++;
          } else {
            console.log('\n' + agendaCpf);
            break;
          }
        }
        if (controladorAgendamento == 2) {
          let dataConsulta = readlineSync.question('Data da consulta:');
          //Chamada para serviço de validacao e cadastro do nome do paciente
          let cadastroDataConsulta =
            serviceConsulta.validaDataAgendamento(dataConsulta);
          if (cadastroDataConsulta == true) {
            serviceConsulta.registraDataService(dataConsulta, consulta);
            controladorAgendamento++;
          } else {
            console.log('\n' + cadastroDataConsulta + '\n');
          }
        }
        if (controladorAgendamento == 3) {
          let HoraInicialConsulta = readlineSync.question('Hora Inicial:');
          let cadastroHoraInicial = serviceConsulta.validaHoraInicialService(
            HoraInicialConsulta,
            consulta,
          );
          if (cadastroHoraInicial == true) {
            serviceConsulta.registraHoraInicialService(
              HoraInicialConsulta,
              consulta,
            );
            controladorAgendamento++;
          } else {
            console.log('\n' + cadastroHoraInicial + '\n');
          }
        }
        if (controladorAgendamento == 4) {
          let HoraFinalConsulta = readlineSync.question('Hora Final:');
          let cadastroHoraFinal = serviceConsulta.validaHoraFinalService(
            HoraFinalConsulta,
            consulta,
          );
          if (cadastroHoraFinal == true) {
            let agendamentoSobreposto =
              serviceConsulta.validaAgendamentoSobreposto(consulta);
            if (agendamentoSobreposto == true) {
              serviceConsulta.registraHoraFinalService(
                HoraFinalConsulta,
                consulta,
              );
              controladorAgendamento++;
              console.log('\n' + serviceConsulta.registroFinal(consulta));
            } else {
              console.log('\n' + agendamentoSobreposto + '\n');
              controladorAgendamento++;
            }
          } else {
            console.log('\n' + cadastroHoraFinal + '\n');
          }
        }
      }
    }
    if (menuConsulta == 2) {
      const consulta = serviceConsulta.criarConsulta();
      let cpfConsulta = readlineSync.question('\nCPF:');
      let agendaCpf = serviceConsulta.verificaCPF(
        servicePaciente,
        cpfConsulta,
        2,
      );
      if (agendaCpf == true) {
        let dataConsulta;
        //Validacao do input de data até user informar formato correto
        let controleValida = false;
        while (controleValida === false) {
          dataConsulta = readlineSync.question('Data da consulta:');
          let validacaoDeData =
            serviceConsulta.validaDataAgendamento(dataConsulta);
          if (validacaoDeData === true) {
            controleValida = true;
          } else {
            console.log('\n' + validacaoDeData + '\n');
          }
        }
        //Validacao do input de data até user informar formato correto
        controleValida = false;
        let HoraInicialConsulta;
        while (controleValida == false) {
          HoraInicialConsulta = readlineSync.question('Hora Inicial:');
          let validacaoDeHoraInicial = serviceConsulta.validaHoraInicialService(
            HoraInicialConsulta,
            consulta,
          );
          if (validacaoDeHoraInicial === true) {
            controleValida = true;
          } else {
            console.log('\n' + validacaoDeHoraInicial + '\n');
          }
        }
        //Chamada para exclusao
        let excluiAgendamento = serviceConsulta.excluirConsulta(
          cpfConsulta,
          dataConsulta,
          HoraInicialConsulta,
        );
        //Retorna exclusao
        console.log('\n' + excluiAgendamento);
      } else {
        console.log('\n' + agendaCpf);
      }
    }

    if (menuConsulta == 3) {
      let tipoDeListagem = readlineSync.question(
        'Apresentar a agenda T-Toda ou P-Periodo: ',
      );
      let controleListagem = true;
      while (controleListagem) {
        if (tipoDeListagem == 'T' || tipoDeListagem == 't') {
          serviceConsulta.listagemService(servicePaciente, '', '', 1);
          break;
        }
        else if (tipoDeListagem == 'P' || tipoDeListagem == 'p') {
          let [intervaloInicial, intervaloFinal] = [0, 0];
          let controleIntervalo = false;
          while (controleIntervalo === false) {
            intervaloInicial = readlineSync.question('Data inicial: ');
            let validaDataQualquer =
              serviceConsulta.validacaoDeDataQualquer(intervaloInicial);
            if (validaDataQualquer === true) {
              controleIntervalo = true;
            } else {
              console.log('/n' + validaDataQualquer + '/n');
            }
          }
          controleIntervalo = false;
          while (controleIntervalo === false) {
            intervaloFinal = readlineSync.question('Data final: ');
            let validaDataQualquer =
              serviceConsulta.validacaoDeDataQualquer(intervaloFinal);
            if (validaDataQualquer === true) {
              controleIntervalo = true;
            } else {
              console.log('/n' + validaDataQualquer + '/n');
            }
          }
          serviceConsulta.listagemService(
            servicePaciente,
            intervaloInicial,
            intervaloFinal,
            2,
          );
          break;
        } else {
          console.log('Erro: Opção inválida.');
          controleListagem = false;
        }
      }
    }

    if (menuConsulta == 4) {
      controladorConsulta = false;
    }
    //serviceConsulta.listagemProvisoria();
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
      menuPaciente(servicePaciente, serviceConsulta);
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
