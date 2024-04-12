
export class Currency {

  static run (taxa: number, moedaOrigem: string, moedaDestino: string, AntigoValor: string){
    let novoValor: number | string = taxa * +AntigoValor;
    novoValor = novoValor.toFixed(2).replace('.', ',');;
    AntigoValor = AntigoValor.replace('.', ',');
    const taxaTexto: string = taxa.toFixed(6).replace('.', ',');

    return `${moedaOrigem} ${AntigoValor} => ${moedaDestino} ${novoValor} \nTaxa: ${taxaTexto}`

  }

}

