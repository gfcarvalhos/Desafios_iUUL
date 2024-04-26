import { Paciente } from '../Entities/Paciente.js';
import { PacienteRepository } from '../repositories/PacienteRepository.js';
import { validaCpf } from '../utils/validaCpf.js';
import { OperationError, OperationStatus } from './OperationError.js';

export class PacienteService {
  constructor() {
    this.repositorio = new PacienteRepository();
  }
  criarPaciente(nome, cpf, dataNascimento) {
    let paciente = new Paciente(nome, cpf, dataNascimento);
    return this.repositorio.registrarNovoPaciente(paciente);
  }

  registraCpfPaciente(paciente, newCPF) {
    paciente.registraCpf(newCPF);
  }

  registraNomePaciente(paciente, newNome) {
    paciente.registraNome(newNome);
  }

  validaDataNascimentoPaciente(newDataNascimento) {
    let retornoDataNascimento = Paciente.validaData(newDataNascimento);
    return retornoDataNascimento;
  }

  registraDataNascimentoPaciente(paciente, newDataNascimento) {
    paciente.registraDataNascimento(newDataNascimento);
  }

  cadastroFinal(paciente) {
    this.repositorio.registrarNovoPaciente([
      paciente,
      Paciente.validaIdade(paciente.dataNacimentoPaciente),
    ]);
    return 'Paciente cadastrado com sucesso!';
  }

  exclusaoPaciente(cpf, serviceConsulta) {
    let retornoRepositorioConsulta =
      serviceConsulta.verificaAgendaDoPaciente(cpf);
    if (retornoRepositorioConsulta[0] === true) {
      return 'Erro: paciente não pode ser excluído, pois possui consulta agendada.';
    }
    let retornoRepositorioPaciente = this.repositorio.exclusaoDePaciente(cpf);
    if (!retornoRepositorioPaciente) {
      return 'Erro: paciente não cadastrado';
    }
    serviceConsulta.exclusaoDeConsultasPorCpf(cpf);
    return true;
  }

  encontraPaciente(cpf) {
    let pacienteExiste = this.repositorio.verificaCpfExistente(cpf);
    if (pacienteExiste) {
      return {
        status: OperationStatus.SUCCESS,
        message: OperationError.PATIENT_ALREADY_EXISTS,
      };
    } else {
      return { status: OperationStatus.FAILURE };
    }
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
