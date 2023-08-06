import * as connection from '../database/config.mjs';

function salvarMensagem(mensagem) {
  const instrucao = `
    INSERT INTO messages (mensagem) VALUES ('${mensagem}')
  `;
  return connection.executar(instrucao);
}

function getMensagens() {
  const instrucao = `
    SELECT * FROM messages ;
  `;
  return connection.executar(instrucao);
}

export { salvarMensagem, getMensagens};
