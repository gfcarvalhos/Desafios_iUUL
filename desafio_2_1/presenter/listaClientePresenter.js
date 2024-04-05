import { listaClienteView } from '../view/listaClienteView.js';
/**
 * Faz o gerenciamento da validação dos dados a partir do controller da lista recebida pela view.
 */
class listaClientePresenter {
  #controller;
  #view;

  constructor(controller) {
    this.#controller = controller;

    this.#view = new listaClienteView();
  }

  /**
   * Gerencia a validação e criação da lista dos clientes
   * @returns {Object} Lista dos Clientes
   */
  run() {
    //Cria a lista a partir do arquivo com caminho já validado e valida as informações
    const listaClientesValidar = this.validaCaminho().then((lista) => {
      //Gera uma lista de objetos
      const listaParseada = JSON.parse(lista);
      //Cria a lista final para os dados com erro
      const listaClientesOutput = this.#controller.criaClasseLista();
      //Percorre cada objeto
      listaParseada.forEach((element) => {
        //Valida o objeto
        const objetoResult = this.#controller.createClient(element)
        //Traduz a lista de erros e salva na lista final dos dados com erro
        if(objetoResult.erros.length !== 0){
          const erroProvisorio = []
          for (let erro of objetoResult.erros){
            erroProvisorio.push(this.#view.getErro(erro));
          }
          objetoResult.erros = erroProvisorio;
          this.#controller.addClienteOutput(listaClientesOutput,objetoResult);
        }
      });
      //Gera o arquivo final
      console.log()
      this.#view.geraArquivoFinal(JSON.stringify(this.#controller.getListaDeClientes(listaClientesOutput)));
    });
  }

  /**
   * Valida o caminho do arquivo e retorna a lista de objetos
   * @returns {Array} Lista de clientes
   */
  validaCaminho() {
    const listaDeClientes = this.#view
      .verificaCaminho()
      .then((path) => this.#view.realizaLeituraDoArquivo(path))
      .then((resultado) => {
        return resultado;
      });

    return listaDeClientes;
  }

  /**
   * Gerencia a validação dos dados de cada cliente
   * @param {Object} cliente 
   * @returns {Object} Erros da validacao
   */
  validaDados(cliente){
    let retornoValidacao = {
      nome: 2,
      cpf: 2,
      dataNascimento:'oi' ,
      rendaMensal: 'oi' ,
      estadoCivil: 'oi'
    }
    return retornoValidacao;
  }
}

export { listaClientePresenter };
