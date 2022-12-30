import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import { apiAuthenticated } from '../../services/api';
import { baseURL } from '../../services/api_omdb';

const Home = () => {

  const [search, setSearch] = useState('');
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);

  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSearch = async () => {

    if (search) {
      try {
        await axios
          .get(`${baseURL}s=${search}&page=${page}`)
          .then((response) => {
            console.log(response.data.Search);
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
      <form>
        <label>digite um filme:
          <input type="text" placeholder="Digite um filme aqui" onChange={(e) => { setSearch(e.target.value) }} />
        </label>
      </form>

      <button onClick={() => { handleSearch() }} >
        buscar
      </button>

      {movies.map((movie) => {
        return (

          <div key={movie.imdbID}>
            {movie.Title}
            <button onClick={() => { addFavorite(movie.imdbID) }} >
              favoritar
            </button>

          </div>


        )
      })
      }

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

        <h1 class="title is-3">Buscar Filme:</h1>

        <input class="input is-primary" type="text" placeholder="Digite aqui um filme"></input>
      </div>
    </>


  );
}

export default Home;
