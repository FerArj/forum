import http from 'http';
import express from 'express';
import cors from 'cors';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import userRoutes from './routes/userRoutes.mjs';
import messageRoutes from './routes/messageRoutes.mjs'
import { enviarMensagem, enviarMensagensAntigas } from './controllers/messageController.mjs';
import {configureSocketIO } from './socket.mjs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

const server = http.createServer(app);
const io = new Server(server); 

const publicPath = resolve(__dirname, '../ui');

app.use(express.static(publicPath, { 
  type: 'application/javascript',
}));

app.get('/', (req, res) => {
  res.sendFile(resolve(publicPath, 'index.html'));
});

// Configuração do CORS
app.use(cors());

// Configuração do Body Parser para análise do corpo das requisições
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

configureSocketIO(server.io);

const ipAddress = '192.168.0.195';
const port = 3000; 

server.listen(port, ipAddress, () => {
  console.log(`Servidor WebSocket rodando na porta ${ipAddress}:${port}`);
});

io.on('connection', (socket) => {
  console.log('Novo cliente conectado');

    enviarMensagensAntigas(socket);

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