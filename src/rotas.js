import React from "react";
import { BrowserRouter,  Route, Routes } from "react-router-dom";


import Login from "./pages/Login";
import Livros from "./pages/Livros";
import AddLivros from './pages/AddLivro/index';

export default function Rotas(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={<Login />}/>
                <Route path="/livros" element={<Livros/>}/>
                <Route path="/addLivros/:livroId" element={<AddLivros/>}/>
            </Routes>
        </BrowserRouter>
    );
}