import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import * as mysql from 'mysql2'; 
import userRoutes from './routes/userRoutes.mjs';
import messageRoutes from './routes/messageRoutes.mjs'
import { enviarMensagem } from './controllers/messageController.mjs';

const app = express();
const server = http.createServer(app);
const io = new Server(server); 


// Configuração do CORS
app.use(cors());

// Configuração do Body Parser para análise do corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

server.listen(3000, () => {
  console.log('Servidor WebSocket rodando na porta 3000');
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

  socket.on('enviarMensagem', async (message) => {
    console.log(`Mensagem recebida do cliente: ${message}`);
    io.emit('mensagemRecebida', message);

    try{
      await enviarMensagem(message);
    } catch (error){
      console.error("Erro ao enviar mensagem", error);
    }
  });
});

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
