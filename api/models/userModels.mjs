import * as connection from '../database/config.mjs';

function cadastrarUsuario(nome, email, senha) {
  const instrucao = `
    INSERT INTO user (nome, email, senha) VALUES ('${nome}', '${email}', '${senha}')
  `;
  return connection.executar(instrucao);
}

function autenticarUsuario(nome, senha) {
    const instrucao = `
    SELECT * FROM user WHERE nome = '${nome}' AND senha = '${senha}';
    `;
    return connection.executar(instrucao);
}

export default {
  cadastrarUsuario,
  autenticarUsuario
};
