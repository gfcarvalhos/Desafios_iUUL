
export function calculaTempoDeConsulta(listaOrdenada) {
  let tempo = [];
  listaOrdenada.forEach((consulta) => {
    //Transforma o horario em minutos MM
    let horaFinalEmMinutos =
      +consulta.horaFinalConsulta.slice(0, 2) * 60 +
      +consulta.horaFinalConsulta.slice(2, 4);
    let horaInicialEmMinutos =
      +consulta.horaInicialConsulta.slice(0, 2) * 60 +
      +consulta.horaInicialConsulta.slice(2, 4);
    //Calcula a diferença em minutos da consulta
    let diferencaMinutos = horaFinalEmMinutos - horaInicialEmMinutos;
    //Calcula a unidade de Horas do tempo de duração da consulta e em seguida a unidade que sobra em minutos
    let tempoHora = Math.floor(diferencaMinutos / 60);
    let tempoMinuto = diferencaMinutos % 60;
    //Tratamento desse resultado para atender ao padrão do retorno ao user
    let [tempoHoraFinal, tempoMinutoFinal] = ['', ''];
    if (tempoHora.toString().length === 2) {
      tempoHoraFinal = tempoHora.toString();
    } else {
      tempoHoraFinal = '0' + tempoHora;
    }
    if (tempoMinuto.toString().length === 2) {
      tempoMinutoFinal = tempoMinuto.toString();
    } else {
      tempoMinutoFinal = '0' + tempoMinuto;
    }
    //salva na lista tempo o tempo de duração da consulta no formato HH:MM
    tempo.push(tempoHoraFinal + ':' + tempoMinutoFinal);
  });
  return tempo;
}