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
      const listaParseada = JSON.parse(lista);
      const listaClientesOutput = this.#controller.criaClasseLista();
      listaParseada.forEach((element) => {
        const listaOutPut = this.#controller.criaClasseLista();
        const objetoResult = this.#controller.createClient(element)
        if(objetoResult.erros.length !== 0){
          const erroProvisorio = []
          for (let erro of objetoResult.erros){
            erroProvisorio.push(this.#view.getErro(erro));
          }
          objetoResult.erros = erroProvisorio;
          console.log(objetoResult)
        }
      });
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
