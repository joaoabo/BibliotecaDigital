import React, {useState, useEffect} from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import logoimage from "../../assets/web-developer.png";
import "./styles.css";

export default function AddLivros(){

    const [id, setId] = useState(null);
    const [author, setAutor] = useState('');
    const [title, setTitulo] = useState('');
    const [launchDate, setDatalancamento] = useState('');
    const [price, setPreco] = useState('');

    const { livroId } = useParams();

    const navigate = useNavigate();

    const accessToken = localStorage.getItem('accessToken');
    const authorization = {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    }

    useEffect(() => {
        if(livroId === '0')return;
        else carregarLivro();
    }, livroId);

    async function carregarLivro() {
        try {
            const response = await api.get(`api/Book/v1/${livroId}`, authorization)

            let ajustadata = response.data.launchDate.split("T", 10)[0]

            setId(response.data.id);
            setAutor(response.data.author);
            setTitulo(response.data.title);
            setDatalancamento(ajustadata);
            setPreco(response.data.price);
        } catch (error) {
            alert(`Falha ao carregar livro ${id}`)
            navigate('/livros');
        }
    }

    async function saveOrUpdate(e) {
        e.preventDefault();
        const data = {
            author,
            title,
            launchDate,
            price,
        }

        try {
            if(livroId === '0'){
                await api.post('api/Book/v1', data, authorization);
            }else {
                data.id = id;
                await api.put('api/Book/v1', data, authorization);
            }
        } catch (error) {
            alert('Falha no cadastro!')
        }
        navigate('/livros');
    }
    return(
        <div className="main-body">
            <div className="add-livros">
            <div className="add-container">
                
                <div className="content">
                    <section className="form">
                        <img src={logoimage} alt="Joao"/>
                        <h1>{livroId === '0'? 'Cadastrar um novo livros' : 'Salvar alterações'}</h1>
                        <p>Adicionando conhecimento a nossa biblioteca!</p>
                        <Link className="back-link" to="/livros">
                            <FiArrowLeft size={23}/>Voltar aos livros
                        </Link>
                    </section>
                    <form onSubmit={saveOrUpdate}>
                        <div className="add-input">
                            <input
                                className={"input"}
                                type="Titulo"
                                placeholder="Titulo"
                                value={title}
                                onChange={e => setTitulo(e.target.value)}
                            />
                        </div>
                        <div className="add-input">
                            <input
                                className={"input"}
                                type="Autor"
                                placeholder="Autor"
                                value={author}
                                onChange={e => setAutor(e.target.value)}
                            />
                        </div>
                        <div className="add-input">
                            <input
                                className={"input"}
                                type="date"
                                placeholder="Data"
                                value={launchDate}
                                onChange={e => setDatalancamento(e.target.value)}
                            />
                        </div>
                        <div className="add-input">
                            <input
                                className={"input"}
                                type="Preço"
                                placeholder="Preço"
                                value={price}
                                onChange={e => setPreco(e.target.value)}
                            />
                        </div>
                        <div className="container-login-form-btn">
                            <button className="login-form-btn" >{livroId === '0'? 'Cadastrar' : 'Salvar'}</button>
                        </div>
                    </form>
                </div>
                </div>
            </div>
        </div>
    )
}