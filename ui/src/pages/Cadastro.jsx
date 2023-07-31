import Input from "../components/Input";
import Button from "../components/Button"
import style from "./Cadastro.module.css"
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios"

function Cadastro() {
    const userEmailRef = useRef(null)
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    function handleCadastrar() {
        axios.post("http://192.168.0.195:3000/users/cadastrarUsuario", {
            email: userEmailRef.current.value,
            nome: usernameRef.current.value,
            senha: passwordRef.current.value
        }).then((resp) => {
            if(resp.status === 200){
                navigate("/login");
            }
        }).catch(err =>{
            console.log(err);
        })
    }

    return (
        <div className={style.containerCadastro}>
            <label>Email</label>
            <Input type="text" ref={userEmailRef} />
            <label>Nome</label>
            <Input type="email" ref={usernameRef} />
            <label>Senha</label>
            <Input type="password" ref={passwordRef} />
            <Button
                onClick={handleCadastrar}
                children={"Cadastrar"}
            />
            <p>Já tem uma conta <span onClick={() => navigate("./*")}>Acesse</span></p>
        </div>
    )
}

export default Cadastro;