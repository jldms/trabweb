import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

import { apiAuthenticated } from '../../services/api';
import { baseURL_text } from '../../services/api_omdb';

const DetailReview = () => {

    const { logout } = useContext(AuthContext);

    const [detail, setDetail] = useState([]);
    const [movie, setMovie] = useState('');

    const navigate = useNavigate();

    const location = useLocation();

    useEffect(() => {
        const getMyReview = async (omdbID) => {

            try {
                await apiAuthenticated
                    .get(`/reviews/${omdbID}`)
                    .then((response) => {
                        console.log(response);
                        setDetail(response.data.reviews)
                    });
            }
            catch (error) {
                console.log(error.response.status);
            }
        };

        const getInfoMovie = async (omdbID) => {
            try {
                await axios
                    .get(`${baseURL_text}i=${omdbID}`)
                    .then((response) => {
                        setMovie(response.data.Title)
                    });
            }
            catch (error) {
                console.log(error.response.status);
            }
        }


        getMyReview(location.state.id);
        getInfoMovie(location.state.id);
    }, []);

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

                <h1 class="subtitle is-1">Aqui estão as avaliações do filme: {movie} </h1>

                {detail.length > 0 ?
                    detail.map((detail, index) => {
                        return (
                            <div class="box" key={index}>
                                {detail.comment}
                            </div>
                        )
                    })
                    :
                    <p> não há reviews para este filme</p>
                }
            </div>
        </>
    );
}

export default DetailReview;