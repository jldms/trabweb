import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../../context/AuthContext';

import { useNavigate } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';

const Favorite = () => {

    const { logout } = useContext(AuthContext);

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
            <p>Página dos Favoritos</p>

            <button onClick={() => { logout() }} >
                logout
            </button>

            <button onClick={() => { navigate('/') }} >
                voltar
            </button>

            <p>meus favoritos:</p>

            {favorites.length > 0 ?
                favorites.map((favorite) => {
                    return (
                        <div key={favorite.imdbID}>
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
        </>
    );
}

export default Favorite;