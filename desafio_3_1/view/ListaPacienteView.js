import { ConsultaService } from "../controller/ConsultaController.js";

export class ListaPacienteView {
  serviceConsulta
  
  constructor(){
    this.serviceConsulta = new ConsultaService();
  }

  listagemDePacientes(listaGeralPacientes) {
    // Cabeçalho
    console.log('\n' + '-'.repeat(60));
    console.log(
      'CPF' +
        ' '.repeat(9) +
        'Nome' +
        ' '.repeat(29) +
        'Dt.Nasc.' +
        ' '.repeat(2) +
        'Idade',
    );
    console.log('-'.repeat(60));
    //Informações por paciente
    listaGeralPacientes.forEach((paciente) => {
      const cpf = paciente.cpfPaciente.padEnd(11, ' ');
      const nome = paciente.nomePaciente.padEnd(16, ' ');
      const dataNascimento = paciente.dataNascimentoPaciente.padStart(
        25,
        ' ',
      );
      const idade = paciente.idadePaciente.toFixed(0).padStart(5, ' ');
      console.log(`${cpf} ${nome} ${dataNascimento} ${idade}`);
      //Verifica a agenda do paciente e caso haja agendas futuras, plota essas consultas
      const agendaDoPaciente = this.serviceConsulta.verificaAgendaDoPaciente(
        paciente.cpfPaciente,
      );
      if (agendaDoPaciente[0] === true) {
        agendaDoPaciente[1].forEach((consulta) => {
          const dataConsulta = consulta.dataDeConsulta;
          const horaInicial = consulta.horaInicialConsulta;
          const horaFinal = consulta.horaFinalConsulta;
          const mensagemFinalConsulta =
            ' '.repeat(12) +
            'Agendado para: ' +
            dataConsulta +
            '\n' +
            ' '.repeat(12) +
            horaInicial.slice(0, 2) +
            ':' +
            horaInicial.slice(2, 4) +
            ' às ' +
            horaFinal.slice(0, 2) +
            ':' +
            horaFinal.slice(2, 4);

          console.log(mensagemFinalConsulta);
        });
      }
    });
  }

}
