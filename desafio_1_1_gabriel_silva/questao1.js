//Gabriel Felipe Carvalho Silva
import readlineSync from 'readline-sync';
import { fileURLToPath } from 'url';
import process from 'process';

export class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get valueX() {
    return this.#x;
  }

  get valueY() {
    return this.#y;
  }

  distancia(other) {
    return parseFloat(
      Math.sqrt(
        (this.#x - other.valueX) ** 2 + (this.#y - other.valueY) ** 2,
      ).toFixed(2),
    );
  }

  move(newX, newY) {
    this.#x = newX;
    this.#y = newY;
  }

  equals(other) {
    return this.#x == other.valueX && this.#y == other.valueY;
  }
}

function interacao() {
  try {
    //Geração das coordenadas
    let counter = 1;
    let coordenadaList = [];
    while (counter <= 3) {
      let inputX = readlineSync.questionInt(
        `Digite o valor de X para o ponto ${counter}: `,
      );
      let inputY = readlineSync.questionInt(
        `Digite o valor de Y para o ponto ${counter}: `,
      );
      console.log();
      coordenadaList.push([inputX, inputY]);
      counter++;
    }
    //Geração das instâncias/objetos
    let verticeLista = [];
    coordenadaList.forEach((coordenada) => {
      verticeLista.push(new Vertice(coordenada[0], coordenada[1]));
    });

    //Chamada de métodos
    let controlador = 1;
    while (controlador != 0) {
      controlador = readlineSync.questionInt(
        'Qual metodo deseja utilizar? \n (1) Distancia Euclidiana entre pontos \n (2) Comparacao de pontos \n (0) Finalizar \n Digite aqui: ',
      );
      console.log;
      if (controlador != 0) {
        let ponto1 = readlineSync.questionInt(
          `\n Qual o primeiro ponto: \n (1) [${coordenadaList[0]}] \n (2) [${coordenadaList[1]}] \n () [${coordenadaList[2]}] \n Digite aqui: `,
        );
        let ponto2 = readlineSync.questionInt(
          `\n Qual o segundo ponto: \n (1) [${coordenadaList[0]}] \n (2) [${coordenadaList[1]}] \n (3) [${coordenadaList[2]}] \n Digite aqui: `,
        );

        if (controlador == 1) {
          let resultado = verticeLista[ponto1 - 1].distancia(
            verticeLista[ponto2 - 1],
          );
          console.log(`\n Resultado: ${resultado}`);
        }
        if (controlador == 2) {
          let resultado = verticeLista[ponto1 - 1].equals(
            verticeLista[ponto2 - 1],
          );
          console.log(`\n Resultado: ${resultado}`);
        }
      }
      console.log();
    }
  } catch (error) {
    console.log('Valor informado inválido');
  } finally {
    console.log('Finalizado.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  interacao();
}
