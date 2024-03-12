const dataAtual = new Date()
const opcoes = { timeZone: 'America/Sao_Paulo' };
const dataBrasil = dataAtual.toLocaleString('pt-BR', opcoes);

console.log('Data no fuso horário do Brasil:', dataBrasil);