class ListaCliente {
  #clientes;

  constructor() {
    this.#clientes = [];
  }

  setListaDeClientes(lista) {
    this.#clientes = Object(lista);
    console.log(this.#clientes)
  }

  addClienteRetorno(objeto){
    this.#clientes.push(objeto);
  }
  
}

export { ListaCliente };
