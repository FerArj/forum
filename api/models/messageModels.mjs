import { executar } from '../app.mjs';

function salvarMensagem(mensagem) {
  const instrucao = `
    INSERT INTO mensagens (mensagem) VALUES ('${mensagem}')
  `;
  return executar(instrucao);
}

export { salvarMensagem };
