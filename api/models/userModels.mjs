import { executar } from '../app.mjs';

function cadastrarUsuario(nome, email, senha) {
  const instrucao = `
    INSERT INTO user (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')
  `;
  return executar(instrucao);
}

function autenticarUsuario(nome, senha) {
    const instrucao = `
    SELECT * FROM user WHERE nome = '${nome}' AND senha = '${senha}';
    `;
    return executar(instrucao);
}

export default {
  cadastrarUsuario,
  autenticarUsuario
};
