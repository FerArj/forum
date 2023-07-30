import userModel from '../models/userModels.mjs';

const cadastrarUsuario = (req, res) => {
  const { nome, email, senha } = req.body;

  userModel.cadastrarUsuario(nome, email, senha)
    .then(() => {
      res.status(200).send('cadastro realizado com sucesso');
    })
    .catch((erro) => {
      console.log(erro);
    });
};

const autenticarUsuario = (req, res) => {
    const { nome, senha } = req.body;

    userModel.autenticarUsuario(nome, senha)
    .then((resultado) => {
        if(resultado.length > 0){
            res.status(200).send('login realizado');
        } else {
            res.status(401).send('usuário ou senha inválidos');
        }
    })
    .catch((erro) => {
        console.log(erro);
        res.status(500).send('erro ao autenticar usuário');
    });
}


export default {
  cadastrarUsuario,
  autenticarUsuario
};
