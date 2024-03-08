//Gabriel Felipe Carvalho Silva
import { Vertice } from './questao1.js';
import readlineSync from 'readline-sync';
import { fileURLToPath } from 'url';
import process from 'process';

class Triangulo extends Vertice {
  constructor(v1, v2, v3) {
    super();
    this.v1 = new Vertice(v1[0], v1[1]);
    this.v2 = new Vertice(v2[0], v2[1]);
    this.v3 = new Vertice(v3[0], v3[1]);
    if (
      !(
        this.v1.distancia(this.v2) + this.v1.distancia(this.v3) >
          this.v2.distancia(this.v3) &&
        this.v1.distancia(this.v2) + this.v2.distancia(this.v3) >
          this.v1.distancia(this.v3) &&
        this.v1.distancia(this.v3) + this.v2.distancia(this.v3) >
          this.v1.distancia(this.v2)
      )
    ) {
      throw new TypeError('Os vértices não geram um Triângulo.');
    }
  }

  get v1Coordinates() {
    return [this.v1.valueX, this.v1.valueY];
  }

  get v2Coordinates() {
    return [this.v2.valueX, this.v2.valueY];
  }

  get v3Coordinates() {
    return [this.v3.valueX, this.v3.valueY];
  }

  equals(otherTriangulo) {
    //Listas com o comprimento dos lados de cada triangulo a ser comparado
    let triangulo1 = [
      this.v1.distancia(this.v2),
      this.v1.distancia(this.v3),
      this.v2.distancia(this.v3),
    ];
    let triangulo2 = [
      otherTriangulo.v1.distancia(otherTriangulo.v2),
      otherTriangulo.v1.distancia(otherTriangulo.v3),
      otherTriangulo.v2.distancia(otherTriangulo.v3),
    ];
    //Ordenação dos lados do menor pro maior
    triangulo1.sort((a, b) => a - b);
    triangulo2.sort((a, b) => a - b);
    //Agrupamento dos lados supostamente semelhantes
    let comparativo = [
      [triangulo1[0], triangulo2[0]],
      [triangulo1[1], triangulo2[1]],
      [triangulo1[2], triangulo2[2]],
    ];
    //Calculando a proporção
    let final = [];
    comparativo.forEach((lado) => {
      final.push(lado[0] / lado[1]);
    });
    return final[0] == final[1] && final[1] == final[2];
  }

  get perimetro() {
    let lados = [
      this.v1.distancia(this.v2),
      this.v1.distancia(this.v3),
      this.v2.distancia(this.v3),
    ];
    return lados.reduce((total, lado) => total + lado, 0);
  }

  tipo() {
    let lados = [
      this.v1.distancia(this.v2),
      this.v1.distancia(this.v3),
      this.v2.distancia(this.v3),
    ];
    if (lados[0] == lados[1] && lados[1] == lados[2]) {
      return 'Triângulo Equilátero.';
    } else if (
      lados[0] == lados[1] ||
      lados[1] == lados[2] ||
      lados[0] == lados[2]
    ) {
      return 'Triângulo Isósceles.';
    } else {
      return 'Triângulo Escaleno.';
    }
  }

  clone() {
    return new Triangulo(
      [this.v1.valueX, this.v1.valueY],
      [this.v2.valueX, this.v2.valueY],
      [this.v3.valueX, this.v3.valueY],
    );
  }

  get area() {
    let semiperimetro = this.perimetro / 2;
    return Math.sqrt(
      semiperimetro *
        (semiperimetro - this.v1.distancia(this.v2)) *
        (semiperimetro - this.v1.distancia(this.v3)) *
        (semiperimetro - this.v2.distancia(this.v3)),
    );
  }
}

function interacao() {
  try {
    //Geração dos triângulos
    let counter = 1;
    let coordenadaList = [];
    let verticeCounter = 1;
    let trianguloLista = [];
    console.log(
      'Serão gerados 3 triângulos nessa primeira etapa. Para cada triângulo é necessário informar a posição em 2D de seus três vértices. \n',
    );
    while (counter <= 3) {
      if (verticeCounter == 1) {
        console.log(`Dados do Triângulo ${counter}:`);
      }
      let inputX = readlineSync.questionInt(
        `Digite o valor de X do vertice ${verticeCounter}: `,
      );
      let inputY = readlineSync.questionInt(
        `Digite o valor de Y do vertice ${verticeCounter}: `,
      );
      console.log();
      coordenadaList.push([inputX, inputY]);
      verticeCounter++;
      if (verticeCounter == 4) {
        counter++;
        verticeCounter = 1;
        trianguloLista.push(
          new Triangulo(
            coordenadaList[0],
            coordenadaList[1],
            coordenadaList[2],
          ),
        );
        coordenadaList = [];
      }
    }
    //Chamada de métodos
    let controlador = 1;
    while (controlador != 0) {
      controlador = readlineSync.questionInt(
        'Qual metodo deseja utilizar? \n (1) Equals \n (2) Perimetro \n (3) Tipo \n (4) Clone \n (5) Area \n (0) Finalizar \n Digite aqui: ',
      );
      console.log();
      if (controlador == 1) {
        let tr1 = readlineSync.questionInt(
          `\n Qual o primeiro triangulo a ser comparado: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );
        let tr2 = readlineSync.questionInt(
          `\n Qual o segundo triangulo a ser comparado: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );

        console.log(
          ' \n Resultado: ' +
            trianguloLista[tr1 - 1].equals(trianguloLista[tr2 - 1]),
        );
      }
      if (controlador == 2) {
        let resultado = readlineSync.questionInt(
          `\n Qual o triangulo a ser verificado: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );
        console.log(
          `\n Perímetro do triângulo ${resultado}: ${
            trianguloLista[resultado - 1].perimetro
          }`,
        );
      }
      if (controlador == 3) {
        let resultado = readlineSync.questionInt(
          `\n Qual o triangulo a ser verificado: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );
        console.log(
          `\n Resultado: o triângulo ${resultado} é um ${trianguloLista[
            resultado - 1
          ].tipo()}`,
        );
      }

      if (controlador == 4) {
        let resultado = readlineSync.questionInt(
          `\n Qual o triangulo deve ser clonado: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );
        let newTriangulo = trianguloLista[resultado - 1].clone();
        console.log(
          `\n Resultado: um novo triângulo com os mesmo parâmetro do triângulo ${resultado} foi criado.`,
        );
      }

      if (controlador == 5) {
        let resultado = readlineSync.questionInt(
          `\n Qual o triangulo a ser calculada a área: \n (1) Triangulo 1: [[${trianguloLista[0].v1Coordinates}], [${trianguloLista[0].v2Coordinates}], [${trianguloLista[0].v3Coordinates}]] \n (2) Triangulo 2: [[${trianguloLista[1].v1Coordinates}], [${trianguloLista[1].v2Coordinates}], [${trianguloLista[1].v3Coordinates}]] \n (3) Triangulo 3: [[${trianguloLista[2].v1Coordinates}], [${trianguloLista[2].v2Coordinates}], [${trianguloLista[2].v3Coordinates}]] \n Digite aqui: `,
        );
        console.log(
          `\n A área do triângulo ${resultado} é: ${trianguloLista[
            resultado - 1
          ].area}`,
        );
      }
      console.log();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log('Programa Finalizado.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  interacao();
}
