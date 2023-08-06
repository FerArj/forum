import Input from "../components/Input";
import Button from "../components/Button"
import style from "./Login.module.css"
import { useRef } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    const navigate = useNavigate();

    function handleLogin (){

        axios.post("http://192.168.0.195:3000/users/autenticarUsuario", {
            nome: usernameRef.current.value,
            senha: passwordRef.current.value
        }).then(res => {
            if(res.status = 200){
                console.log("logado");
                sessionStorage.setItem('usuario', usernameRef.current.value);
                navigate("./feed")
            }
        }).catch(err => {
            console.log(err);
        });
    }

    return (
        <div className={style.containerLogin}>
            <label>Nome</label>
            <Input type="text" ref={usernameRef} />
            <label>Senha</label>
            <Input type="password" ref={passwordRef} />
            <Button 
                onClick={handleLogin} 
                children={"Acessar"}
            />
            <p>Não tem uma conta? <span onClick={() => navigate("./cadastro")}>Crie</span></p>
        </div>
    )
}

export default Login;