class ListaCliente {
  #clientes;

  constructor() {
    this.#clientes = [];
  }

  setListaDeClientes(lista) {
    this.#clientes = Object(lista);
  }

  addClienteRetorno(objeto){
    this.#clientes.push(objeto);
  }

  getClientes(){
    return this.#clientes;
  }
}

export { ListaCliente };
