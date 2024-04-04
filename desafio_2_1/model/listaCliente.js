class ListaCliente {
  #clientes;

  constructor() {
    this.#clientes = [];
  }

  setListaDeClientes(lista) {
    this.#clientes = Object(lista);
    console.log(this.#clientes)
  }
}

export { ListaCliente };
