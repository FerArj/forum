import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000', {
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
        socket.on('mensagemRecebida', (mensagemRecebida) => {
            console.log('Mensagem recebida do servidor:', mensagemRecebida);
            setMensagensFeed((mensagensAntigas) => [...mensagensAntigas, mensagemRecebida.mensagem]);
        });
    }, []);

    return (
        <div>
            <div>
                {mensagensFeed.map((msg, index) => (
                    <div key={index}>{msg}</div>
                ))}
            </div>
            <input type="text" value={mensagem} onChange={(e) => setMensagem(e.target.value)} />
            <button onClick={enviarMensagem}>Enviar</button>
        </div>
    )
}

export default Feed