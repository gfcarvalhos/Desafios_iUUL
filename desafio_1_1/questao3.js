//Gabriel Felipe Carvalho Silva
import { Vertice } from './questao1.js';
import readlineSync from 'readline-sync';
import { fileURLToPath } from 'url';
import process from 'process';
import { verify } from 'crypto';

class Poligono extends Vertice {
  constructor(...others) {
    super();
    this.vertices = [...others];
    if (this.vertices.length < 3) {
      throw new Error('O polígono deve possuir pelo menos 3 vértices.');
    }
    this.vertices.forEach((vertice, index, vertices) => {
      vertices[index] = new Vertice(vertice[0], vertice[1]);
    });
  }

  get poligonoVertices() {
    this.vertices.forEach((vertice) =>
      console.log([vertice.valueX, vertice.valueY]),
    );
  }

  addVertice(newVertice) {
    if (
      this.vertices.some(
        (vertice) =>
          vertice.valueX == newVertice[0] && vertice.valueY == newVertice[1],
      )
    ) {
      return false;
    } else {
      this.vertices.push(new Vertice(newVertice[0], newVertice[1]));
      return true;
    }
  }

  perimetro() {
    let perimetroTotal = 0;
    for (let i = 0; i < this.vertices.length; i++) {
      let verticeAtual = this.vertices[i];
      let verticeProx =
        this.vertices[i + 1 == this.vertices.length ? 0 : i + 1];
      perimetroTotal += verticeAtual.distancia(verticeProx);
    }
    return perimetroTotal;
  }

  qtdVertices() {
    return this.vertices.length;
  }
}

function interacao() {
  try {
    //Geração dos triângulos
    let counter = 1;
    let coordenadaList = [];
    let poligonoFinal = [];
    console.log('Qual a quantidade de vértices que terá o polígono?')
    let qtd = readlineSync.questionInt(
      'Digite aqui: ',
    );
    console.log(
      `\nO polígono que você quer gerar possui ${qtd} vértices. Insira os dados a seguir: \n`,
    );
    while (counter <= qtd) {
      let inputX = readlineSync.questionInt(
        `Digite o valor de X do vertice ${counter}: `,
      );
      let inputY = readlineSync.questionInt(
        `Digite o valor de Y do vertice ${counter}: `,
      );
      console.log();
      coordenadaList.push([inputX, inputY]);
      counter++;
    }
    poligonoFinal = new Poligono(...coordenadaList);
 
    //Chamada de métodos
    let controlador = 1;
    while (controlador != 0) {
      controlador = readlineSync.questionInt(
        'Qual metodo deseja utilizar? \n (1) Adicionar mais um vertice (addVertice) \n (2) Perimetro \n (3) Quantidade de vertices do poligono (qtdVertices) \n (0) Finalizar \n Digite aqui: ',
      );
      console.log();
      if (controlador == 1) {
        const otherVerticeX = readlineSync.questionInt(
          `Digite o valor de X do novo vertice: `,
        );
        const otherVerticeY = readlineSync.questionInt(
          `Digite o valor de Y do novo vertice: `,
        );
        const otherVertice = [otherVerticeX, otherVerticeY];
        console.log(' \n Resultado: ' + poligonoFinal.addVertice(otherVertice));
      }
      if (controlador == 2) {

        console.log(`\n Perímetro do polígono: ${poligonoFinal.perimetro()}`);
      }
      if (controlador == 3) {
        console.log(
          `\n Quantidade de vértices do polígono: ${poligonoFinal.qtdVertices()}`,
        );
      }
      console.log();
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    console.log('\nPrograma Finalizado.');
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  interacao();
}
