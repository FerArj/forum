import { executar } from '../app.mjs';

function salvarMensagem(mensagem) {
  const instrucao = `
    INSERT INTO messages (mensagem) VALUES ('${mensagem}')
  `;
  return executar(instrucao);
}

function getMensagens() {
  const instrucao = `
    SELECT * FROM messages ;
  `;
  return executar(instrucao);
}

export { salvarMensagem, getMensagens};
