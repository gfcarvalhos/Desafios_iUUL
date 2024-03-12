export class ConsultaRepository {
  constructor(...consultas) {
    this.consultas = [...consultas];
  }

  registrarNovaConsulta(newConsulta) {
    this.consultas.push(newConsulta);
  }
}
