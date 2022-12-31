import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';
import { baseURL_text } from '../../services/api_omdb';

const Favorite = () => {

    const { logout } = useContext(AuthContext);

    const [favorites, setFavorites] = useState([])

    const navigate = useNavigate();

    const res = [];

    useEffect(() => {
        const getFavorites = async () => {

            try {
                await apiAuthenticated
                    .get('/favorites')
                    .then((response) => {
                        
                        setFavorites(response.data.favorites)
                    });
            }
            catch (error) {
                console.log(error.response.status);
            }
        };

        
        getFavorites();

        

        

    }, []);

    const getMovie = async (id) => {

        try {
            await axios
                .get(`${baseURL_text}i=${id}`)
                .then((response) => {
                    return(response.data.Title)
                });
        }
        catch (error) {
            console.log(error.response.status);
        }

    }

    
    const delFavorite = async (id) => {
        try {
            await apiAuthenticated
                .delete(`/favorites/${id}`)
                .then((response) => {
                    console.log(response)
                });
        }
        catch (error) {
            console.log(error.response.status);
        }
    }

    return (
        <>

            <div className="container is-widescreen">

                <nav class="navbar is-dark" role="navigation" aria-label="main navigation">

                    <div id="navbarBasicExample" class="navbar-menu">
                        <div class="navbar-start">
                            <a class="navbar-item" onClick={() => { navigate('/') }}>
                                Voltar
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
                <h1 class="subtitle is-1">Aqui estão seus filmes favoritos: </h1>

                {favorites.length > 0 ?
                    favorites.map((favorite, index) => {
                        
                        return (
                            <div key={index}>
                                {favorite.imdbID}
                                
                                <button onClick={() => { delFavorite(favorite.imdbID) }} >
                                    remover dos favoritos
                                </button>
                            </div>
                        )
                    })
                    :
                    <p>não há favoritos</p>
                }



            </div>
        </>
    );
}

export default Favorite;