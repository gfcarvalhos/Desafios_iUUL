function validaNome(newNome) {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(newNome) && newNome.length >= 5 && newNome.length <= 50;
}
