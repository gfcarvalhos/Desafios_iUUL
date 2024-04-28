import { ConsultaController } from '../controller/ConsultaController.js';
import { AgendamentoDeConsultaPresenter } from './AgendamentoDeConsultaPresenter.js';

export class ConsultaPresenter {
  #consultaController;
  #agendamentoConsulta;

  constructor() {
    this.#consultaController = new ConsultaController();
    this.#agendamentoConsulta = new AgendamentoDeConsultaPresenter();
  }

  async run(opcao) {
    switch (opcao) {
      case 1:
        await this.#agendamentoConsulta.run();
        break;
      case 2:
        break;
      case 3:
        break;
    }
  }
}

/*
function menuAgenda(serviceConsulta, servicePaciente) {
  let controladorConsulta = true;
  while (controladorConsulta) {
    if (menuConsulta == 1) {
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
        } else if (tipoDeListagem == 'P' || tipoDeListagem == 'p') {
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
}*/
