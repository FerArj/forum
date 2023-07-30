import { salvarMensagem } from '../models/messageModels.mjs';
import { getIO } from '../socket.mjs';

const enviarMensagem = async (req, res) => {
  try {
    const { mensagem } = req.body;

    const resultado = await salvarMensagem(mensagem);

    const io = getIO(); 

    io.emit('mensagemRecebida', { mensagem }); 

    res.status(200).json({ message: 'Mensagem enviada e salva com sucesso!' });
  } catch (error) {
    console.error('Erro ao enviar e salvar mensagem:', error);
    res.status(500).json({ error: 'Erro ao enviar e salvar mensagem' });
  }
};

export { enviarMensagem };
