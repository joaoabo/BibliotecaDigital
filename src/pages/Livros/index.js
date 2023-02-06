import React, {useState, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiEdit, FiTrash2 } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";

export default function Livros() {
    const [livros, setLivros] = useState([]);
    // const userName = localStorage.getItem('userName');
    const accessToken = localStorage.getItem('accessToken');

    const navigate = useNavigate();

    useEffect(() => {
      api.get('api/Book/v1/desc/4/1', {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        }
      }).then(response => {
          setLivros(response.data.list)
      })
    }, [accessToken]);
// delete 
    async function deleteLivros(id){
      try {
          await api.delete(`api/Book/v1/${id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })

          setLivros(livros.filter(livros => livros.id !== id))
      } catch (error) {
          alert(`Falha ao deletar o livro ${livros.title}`)
      }
    }
    //editLivros
    async function editLivro(id){
      try {
          navigate(`/addLivros/${id}`)
      } catch (error) {
          alert(`Falha ao deletar o livro ${livros.title}`)
      }
    }
    // logout
    async function logout(){
      try {
          await api.get('api/auth/v1/revoke', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          localStorage.clear();
          navigate('/');
      } catch (error) {
          alert(`Falha ao sair da pagina`)
      }
    }

  return (
    <div className="main-body">
      <div className="main-body-opa">
        <div className="livro-container">
          <header>
            <span>
              {/* Bem vindo, <strong>{userName.toLowerCase()}</strong>! */}
             <h1> Bem vindo, <strong>Joao Antonio</strong>!</h1>
            </span>
            <Link className="button" to="/addLivros/0">
              Adicionar novo livro
            </Link>
            <button onClick={logout} type="button">
              <FiPower size={23} />
            </button>
          </header>
          <h1>Registro de livros</h1>
          <ul>
              {livros.map(livro => (
                <li key={livro.id}>
                <div className="car-conteudo">
                  <h3><strong>Titulo</strong></h3>
                  <h4><p>{livro.title}</p></h4>
                  <h3><strong>Autor</strong></h3>
                  <h4><p>{livro.author}</p></h4>
                  <h3><strong>Preço:</strong></h3>
                  <h4><p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(livro.price)}</p></h4>
                  <h3><strong>Data lançamento</strong></h3>
                  <h4><p>{Intl.DateTimeFormat('pt-BR').format(new Date(livro.launchDate))}</p></h4>
                </div>
                <div className="button-car">
                  <button onClick={() => editLivro(livro.id)} className="button-edit" type="button">
                    <FiEdit size={23} />
                  </button>
                  <button onClick={() => deleteLivros(livro.id)} className="button-excluir" type="button">
                    <FiTrash2 size={23} />
                  </button>
                </div>
              </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
