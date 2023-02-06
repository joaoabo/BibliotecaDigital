import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

import './styles.css';

export default function Login() {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate('');

    async function login(e){
        e.preventDefault();

        const data = {
            userName,
            password,
        };
        try {
            const response = await api.post('api/auth/v1/signin', data);

            localStorage.setItem('username', userName);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            navigate('/livros');
        } catch (error) {
            alert('Falha de altenticação, nome de usuario ou senha estão invalidos!')
        }
    }

    return (
        <div className="loginBody">
        <div className="container-login">
            <div className="wrap-login">
                <form className="login-form"  onSubmit={login}>
                    <div className="logoBi">
                    </div>
                    <span className="login-form-title">
                        <h3>Biblioteca</h3>
                    </span>
                    <div className="wrap-input">
                        <input
                         className={"input"} 
                         placeholder="Nome de usuario"
                         value={userName}
                         onChange={e => setUserName(e.target.value)}
                         />
                    </div>
                    <div className="wrap-input">
                        <input
                        className={"input"}
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="container-login-form-btn">
                        <button className="login-form-btn" type="submit">Login</button>
                    </div>
                    <div className="text-center">
                        <span className="txt1">Não possui conta? </span>
                        <a className="txt2" >Criar conta</a>
                    </div>
                </form>
            </div>
        </div>
    </div>
    );
}