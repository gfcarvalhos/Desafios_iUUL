function validaIdade(dataVerificar) {
  let dataNascimento = new Date(
    dataVerificar.slice(0, 2),
    dataVerificar.slice(2, 4) - 1,
    dataVerificar.slice(4, 8),
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
  return idade>=18;
}

export { validaIdade };
