
export class Currency {

  static run (taxa: number, moedaOrigem: string, moedaDestino: string, valor: number){
    let novoValor: string | number = taxa * valor;
    novoValor = novoValor.toFixed(2);
    const AntigoValor : string = valor.toFixed(2)

    return `${moedaOrigem} ${AntigoValor} => ${moedaDestino} ${novoValor} \nTaxa: ${taxa}`

  }

}

