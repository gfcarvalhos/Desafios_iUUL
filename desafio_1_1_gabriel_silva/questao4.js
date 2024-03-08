//Gabriel Felipe Carvalho Silva
import readlineSync from 'readline-sync';

class Aluno {
  constructor(matricula, nome, p1 = '-', p2 = '-') {
    this.matricula = matricula;
    this.nome = nome;
    this.p1 = p1;
    this.p2 = p2;

    if (matricula == undefined || nome == undefined) {
      throw new Error('Os campos de matrícula e nome são obrigatórios.');
    }
  }

  get dados() {
    return [this.matricula, this.nome, this.p1, this.p2];
  }

  mudarNota(prova, nota) {
    if (prova == 1) {
      this.p1 = nota;
    } else if (prova == 2) {
      this.p2 = nota;
    }
  }

  media() {
    if (this.p1 == '-' && this.p2 == '-') {
      return 0;
    } else if (this.p1 == '-') {
      return this.p2 / 2;
    } else if (this.p2 == '-') {
      return this.p1 / 2;
    } else {
      return (this.p1 + this.p2) / 2;
    }
  }
}

class Turma {
  constructor(...alunos) {
    this.alunos = [...alunos];
  }

  addAluno(newAluno) {
    let verificador = this.alunos.some(
      (aluno) => aluno.matricula == newAluno.matricula,
    );
    if (verificador) {
      throw new Error(
        'Não é possível adicionar dois alunos com a mesma matrícula na turma.',
      );
    } else {
      return this.alunos.push(newAluno);
    }
  }

  removeAluno(id) {
    this.alunos = this.alunos.filter((aluno) => aluno.matricula != id);
    return this.alunos;
  }

  addNota(id, prova, nota) {
    let aluno = this.alunos.filter((aluno) => aluno.matricula == id);
    aluno[0].mudarNota(prova, nota);
    return aluno;
  }

  get dadosTurma() {
    return this.alunos;
  }

  mostraAlunos() {
    // Cabeçalho
    console.log('—---------------------------------------');
    console.log('Matricula Nome           P1   P2   NF');
    console.log('—---------------------------------------');

    this.alunos.forEach((aluno) => {
      const matricula = aluno.matricula.toString().padEnd(7, ' ');
      const nome = aluno.nome.padEnd(16, ' ');
      const p1 =
        aluno.p1 != '-'
          ? aluno.p1.toFixed(1).padStart(4, ' ')
          : aluno.p1.padStart(4, ' ');
      const p2 =
        aluno.p2 != '-'
          ? aluno.p2.toFixed(1).padStart(4, ' ')
          : aluno.p2.padStart(4, ' ');
      const media = aluno.media().toFixed(1).padStart(5, ' ');
      console.log(`${matricula} ${nome} ${p1} ${p2} ${media}`);
    });
  }
}

function interacao() {
  try {
    //Criacao de Turma e inclusao de alunos
    const turma1 = new Turma();
    //Chamada de métodos
    let controlador = 1;
    while (controlador != 0) {
      console.log('Qual ação deseja realizar na Turma da IUUL: \n');
      controlador = readlineSync.questionInt(
        ' (1) Inserir um aluno na turma. \n (2) Remover um aluno da turma \n (3) Adicionar nota de aluno \n (4) Imprimir lista de alunos \n (0) Finalizar \n\n Digite aqui: ',
      );
      console.log();
      if (controlador == 1) {
        const matriculaAluno = readlineSync.questionInt(
          '\nDigite a matricula do aluno: ',
        );
        const nomeAluno = readlineSync.question('Digite o nome do aluno: ');
        turma1.addAluno(new Aluno(matriculaAluno, nomeAluno));
      }
      if (controlador == 2) {
        const idDoAluno = readlineSync.questionInt(
          'Digite a matricula do aluno a ser removido da turma: ',
        );
        turma1.removeAluno(idDoAluno)
        console.log('\nAluno removido');
      }

      if (controlador == 3) {
        let idDoAluno = readlineSync.questionInt(
          'Digite a matricula do aluno: ',
        );
        if (!turma1.alunos.some((aluno) => aluno.matricula == idDoAluno)) {
          throw new Error('\nNão existe aluno nessa turma com essa matrícula.');
        }
        let provaDoAluno = readlineSync.questionInt(
          'Digite o numero da prova (1) P1 ou (2) P2: ',
        );
        if (provaDoAluno != 1 && provaDoAluno != 2) {
          throw new Error('\nNão existe opção de nota com esse número.');
        }
        let notaDoAluno = readlineSync.questionFloat(
          `Digite a nota atribuida a P${provaDoAluno}: `,
        );
        turma1.addNota(idDoAluno, provaDoAluno, notaDoAluno);
        console.log('\nNota lançada.');
      }

      if (controlador == 4) {
        turma1.mostraAlunos();
      }
      console.log('\n\n');
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log('\nPrograma Finalizado.');
  }
}

interacao();
