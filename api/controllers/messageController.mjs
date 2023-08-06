import { salvarMensagem, getMensagens } from '../models/messageModels.mjs';
import { getIO } from '../socket.mjs';

const enviarMensagem = async (req, res) => {
  try {
    const { usuario, mensagem } = req.body; 

    await salvarMensagem(usuario, mensagem); 

    const io = getIO();
    io.emit('mensagemRecebida', { usuario, mensagem });

    res.status(200).send('Mensagem enviada e salva com sucesso!');
  } catch (error) {
    console.error('Erro ao enviar e salvar mensagem:', error);
    res.status(500).send('Erro ao enviar e salvar mensagem');
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
