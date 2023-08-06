import * as mysql from 'mysql2'; 

const connection = {
    host: 'localhost',
    user: 'root',
    password: 'urubu100',
    database: 'forumdb',
  };
  
  function executar(instrucao) {
    return new Promise(function (resolve, reject) {
      const conexao = mysql.createConnection(connection);
      conexao.connect();
      conexao.query(instrucao, function (erro, resultados) {
        conexao.end();
        if (erro) {
          reject(erro);
        }
        console.log(resultados);
        resolve(resultados);
      });
      conexao.on('error', function (erro) {
        console.error('Erro no mysql', erro.sqlMessage);
      });
    });
  }
export { executar };