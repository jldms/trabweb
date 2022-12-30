import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { apiAuthenticated } from '../../services/api';
import { baseURL_text } from '../../services/api_omdb';

const Home = () => {

  const image = []
  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = async () => {

    if (search) {

      try {
        await axios
          .get(`${baseURL_text}s=${search}&page=${page}`)
          .then((response) => {
            setMovies(response.data.Search)
          });
      }
      catch (error) {
        console.log(error.response.status);
      }

    }

  }


  const addFavorite = async (id) => {
    try {
      await apiAuthenticated
        .post('/favorites', {
          imdbID: id,
        })
        .then((response) => {
          console.log(response)
        });
    }
    catch (error) {
      console.log(error.response.status);
    }
  }

 

  useEffect(() => {
    handleSearch()
  }, [page])

  return (
    <>




      <button onClick={() => { setPage(page + 1) }} >
        proximo
      </button>

      <div className="container is-widescreen">
        <nav class="navbar is-dark" role="navigation" aria-label="main navigation">

          <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-start">
              <a class="navbar-item" onClick={() => { navigate('/') }}>
                Início
              </a>

              <a class="navbar-item" onClick={() => { navigate('/review') }}>
                Review
              </a>

              <a class="navbar-item" onClick={() => { navigate('/favorite') }}>
                Favoritos
              </a>


            </div>

            <div class="navbar-end">
              <div class="navbar-item">
                <div class="buttons">
                  <a class="button is-primary" onClick={() => { logout() }}>
                    <strong>Sair</strong>
                  </a>

                </div>
              </div>
            </div>
          </div>
        </nav>

        <h1 class="subtitle is-3">Buscar Filme:</h1>

        <input class="input is-primary" type="text" placeholder="Digite aqui um filme" onChange={(e) => { setSearch(e.target.value) }}></input>

        <button className="button is-success" onClick={() => { handleSearch() }}>Buscar</button>

        

        {movies.length > 0 ?
          movies.map((movie) => {
              
            return (

              <div class="card" key={movie.imdbID}>

                <div class="media">
                  <div class="media-left">
                    <figure class="image is-128x128">
                      <img src={`https://img.omdbapi.com/?apikey=90b0aa9a&i=${movie.imdbID}`} alt="Placeholder image" />
                    </figure>
                  </div>
                  <div class="media-content">
                    <p class="title is-4">{movie.Title}</p>
                  </div>
                </div>


                <footer class="card-footer">
                  <a class="card-footer-item" onClick={() => { addFavorite(movie.imdbID) }}>Adicionar aos favoritos</a>
                  <a class="card-footer-item" onClick={() => { navigate('/setreview', {state:{id: movie.imdbID}}) }}>Fazer avaliação</a>
                  <a class="card-footer-item" onClick={() => { navigate('/detailreview',{state:{id: movie.imdbID}}) }}>Ver avaliações</a>

                </footer>
              </div>

            )
          })
          :
          <h1 class="subtitle is-1">Faça uma busca para começar</h1>
          


        }


      </div>
    </>


  );
}

export default Home;
