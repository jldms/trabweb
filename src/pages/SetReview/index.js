import React, { useContext, useState, useEffect } from 'react'
import AuthContext from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import ReactStars from 'react-stars';

import { useLocation } from 'react-router-dom';

import { baseURL_text } from '../../services/api_omdb';
import { apiAuthenticated } from '../../services/api';

const SetReview = () => {

    const { login } = useContext(AuthContext);

    const location = useLocation();

    const [movie, setMovie] = useState('');

    const [comment, setComment] = useState('');
    const [stars, setStars] = useState('');



    const navigate = useNavigate();

    const addReview = async (imdbID, comment, stars) => {
        
        try {
            await apiAuthenticated
                .post(`/reviews/${imdbID}`, {
                    comment: comment,
                    stars: stars
                })
                .then((response) => {
                    console.log(response)
                });
        }
        catch (error) {
            console.log(error.response.status);
        }
    };

    useEffect(() => {
        const getMovie = async (omdbID) => {
            console.log(omdbID);
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
        getMovie(location.state.id)
    }, [])

    return (
        <>
            <div className="container is-widescreen">
                <div className="notification is-info">
                    <strong>Escreva sua avaliação do filme: {movie} </strong>
                </div>

                <input className="input" type="text" placeholder="Digite aqui sua avaliação" onChange={(e) => { setComment(e.target.value) }}></input>
                
                <ReactStars
                    count={5}
                    onChange={(value)=>{setStars(value)}}
                    size={24}
                    color2={'#ffd700'} 
                />
                <button className="button is-success" onClick={() => { addReview(location.state.id, comment, stars) }}>Cadastrar</button>
                <button className="button is-warning" onClick={() => { navigate('/') }}>Voltar</button>
            </div>
        </>
    );
}

export default SetReview;