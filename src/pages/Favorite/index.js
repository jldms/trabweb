import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';

const Favorite = () => {

  const {logout} = useContext(AuthContext);

  const [favorites, setFavorites] = useState([])

  const navigate = useNavigate();

  useEffect(() => {
    const getFavorites = async () => {

        try {
          await apiAuthenticated
            .get('/favorites')
            .then((response) => {
              console.log(response.data.favorites);
              setFavorites(response.data.favorites)
            });
        }
        catch (error) {
          console.log(error.response.status);
        }
      };
      getFavorites();
  }, []);
  
  return (
    <>
      <p>favorites</p>

      <button onClick={() => { logout()} } >
        logout
      </button>

      <button onClick={() => { navigate('/')} } >
        voltar
      </button>

      <p>meus favoritos:</p>

      {favorites.length > 0?
        favorites.map((favorite) => {
            return(
                <div  key={favorite.imdbID}>{favorite.imdbID}</div>
            )
        })
        :
        <p>não há favoritos</p>
      }
    </>
  );
}

export default Favorite;