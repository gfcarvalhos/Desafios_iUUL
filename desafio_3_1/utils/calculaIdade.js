

export function calculaIdade(dataVerificar) {
  //divide a string e transforma em Date()
  let partesDaData = dataVerificar.split('/');
  let dataNascimento = new Date(
    partesDaData[2],
    partesDaData[1] - 1,
    partesDaData[0],
  );
  let dataAtual = new Date();
  //Verifica idade pela diferença de anos
  let idade = dataAtual.getFullYear() - dataNascimento.getFullYear();
  let mesAtual = dataAtual.getMonth();
  let mesNascimento = dataNascimento.getMonth();
  //Verifica se no ano corrente o paciente já fez aniversario. Caso nao, diminui em 1 a data
  //calculada entre a diferença de anos
  if (
    mesAtual < mesNascimento ||
    (mesAtual == mesNascimento &&
      dataAtual.getDate() < dataNascimento.getDate())
  ) {
    idade--;
  }
  return idade;
}