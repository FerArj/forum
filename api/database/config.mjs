import * as mysql from 'mysql2'; 
import { configDotenv } from 'dotenv';
configDotenv();


const connection = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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