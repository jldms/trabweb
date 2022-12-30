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
      <p>
        Home
      </p>

      <button onClick={() => { logout() }} >
        logout
      </button>


      <button onClick={() => { navigate('/review') }} >
        review
      </button>

      <button onClick={() => { navigate('/favorite') }} >
        favoritos
      </button>

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
          
            <div  key={movie.imdbID}>
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

    </>


  );
}

export default Home;
