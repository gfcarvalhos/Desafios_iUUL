import { Paciente } from '../Entities/Paciente.js';
import { calculaIdade } from '../utils/calculaIdade.js';
import { OperationError, OperationStatus } from './OperationError.js';

export class PacienteController {
  constructor() {
    this.paciente = new Paciente();
  }
  async salvarNovoPaciente(nome, cpf, dataNascimento) {
    try{
      const idade = calculaIdade(dataNascimento);
      let newPaciente = new Paciente(nome, cpf, dataNascimento, idade);
      const resultado = await newPaciente.salvarPacienteNoBanco();
      return {status: OperationStatus.SUCCESS}
    } catch (error) {
      console.log(error)
      return {status: OperationStatus.FAILURE, message: OperationError.UNEXPECTED_ERROR};
    }
  }

  async exclusaoPaciente(cpf) {
    let retornoRepositorioPaciente = await this.paciente.excluirPaciente(cpf);
    return retornoRepositorioPaciente;
  }

  async verificaExistenciaDeCpf(cpf) {
    let pacienteExiste = await this.paciente.buscaPacientePeloCpf(cpf);
    if (pacienteExiste) {
      return { status: OperationStatus.SUCCESS };
    } else {
      return { status: OperationStatus.FAILURE, message: OperationError.PATIENT_NOT_REGISTERED };
    }
  }

  validaDataNascimentoPaciente(newDataNascimento) {
    let retornoDataNascimento = this.paciente.validaData(newDataNascimento);
    return retornoDataNascimento;
  }

  listagemDePacientes(serviceConsulta, tipoDeClassificacao) {
    //Etapa de ordenação da lista de pacientes
    if (tipoDeClassificacao === 1) this.repositorio.ordenaPorNorme();
    if (tipoDeClassificacao === 2) this.repositorio.ordenaPorCpf();
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
    this.repositorio.listaDePacientes.forEach((paciente) => {
      const cpf = paciente[0].cpfPaciente.padEnd(11, ' ');
      const nome = paciente[0].nomePaciente.padEnd(16, ' ');
      const dataNascimento = paciente[0].dataNacimentoPaciente.padStart(
        25,
        ' ',
      );
      const idade = paciente[1].toFixed(0).padStart(5, ' ');
      console.log(`${cpf} ${nome} ${dataNascimento} ${idade}`);
      //Verifica a agenda do paciente e caso haja agendas futuras, plota essas consultas
      const agendaDoPaciente = serviceConsulta.verificaAgendaDoPaciente(
        paciente[0].cpfPaciente,
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

  buscaPacienteService(cpf) {
    return this.repositorio.buscaPaciente(cpf)[0];
  }
}
