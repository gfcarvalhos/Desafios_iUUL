function validaDataNascimento(newData) {
  //Regex para data no formato DD/MM/YYYY considerando dias entre 1 e 31 e meses entre 1 e 12
  const regex = /^((0[1-9]|[1-2][0-9]|3[0-1])(0[1-9]|1[0-2])(\d{4}))$/;
  //Valida se está de acordo com DD/MM/YYYY
  return regex.test(newData)
}