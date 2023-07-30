import { salvarMensagem, getMensagens } from '../models/messageModels.mjs';
import { getIO } from '../socket.mjs';

const enviarMensagem = async (message) => {
  try {
    const {mensagem} = message;

    const resultado = await salvarMensagem(mensagem);

    const io = getIO();

    io.emit('mensagemRecebida', { mensagem });

    return resultado; 
  } catch (error) {
    console.error('Erro ao enviar e salvar mensagem:', error);
    throw error; 
  }
};

const enviarMensagensAntigas = async (socket) => {
  try {
    const mensagens = await getMensagens();
    socket.emit('mensagensAntigas', mensagens);
  } catch (error) {
    console.error('Erro ao enviar mensagens antigas:', error);
  }
};



export { enviarMensagem, enviarMensagensAntigas};
