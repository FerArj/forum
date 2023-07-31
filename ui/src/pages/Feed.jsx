import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://192.168.0.195:3000', {
    transports: ['websocket']
});

socket.on('connect', () => {
    console.log('Conexão estabelecida com o servidor');
  });

function Feed() {
    const [mensagem, setMensagem] = useState('');
    const [mensagensFeed, setMensagensFeed] = useState([]);

    const enviarMensagem = () => {
        socket.emit('enviarMensagem', {mensagem});
        setMensagem('');
    }


    useEffect(() => {
          // Ouvir o evento 'mensagensAntigas' para receber as mensagens do servidor
    socket.on('mensagensAntigas', (mensagensAntigas) => {
        console.log('Mensagens antigas recebidas do servidor:', mensagensAntigas);
        setMensagensFeed(mensagensAntigas);
      });
  
      // Ouvir o evento 'mensagemRecebida' para receber as novas mensagens do servidor
      socket.on('mensagemRecebida', (mensagemRecebida) => {
        console.log('Mensagem recebida do servidor:', mensagemRecebida);
        setMensagensFeed((mensagensAntigas) => [...mensagensAntigas, mensagemRecebida]);
      });
    }, []);

    return (
        <div>
            <div>
                {mensagensFeed.map((msg, index) => (
                    <div key={index}>{msg.mensagem}</div>
                ))}
            </div>
            <input type="text" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
            <button onClick={enviarMensagem}>Enviar</button>
        </div>
    )
}

export default Feed