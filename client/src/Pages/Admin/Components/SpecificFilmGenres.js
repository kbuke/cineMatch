import { useEffect, useState } from "react";

import "./SpecificFilmGenres.css"
import { json } from "react-router-dom";

export default function SpecificFilmGenres({
    selectFilmId,
    allGenres,
    allFilmGenres,
    setAllFilmGenres
}){
    const [filmsGenres, setFilmsGenres] = useState([])
    const [everyGenre, setEveryGenre] = useState([])
    const [selectedGenreId, setSelectedGenreId] = useState()

    useEffect(() => (
        setEveryGenre(allGenres)
    ), [allGenres])

    useEffect(() => (
        setFilmsGenres(allFilmGenres.filter(filmGenres => filmGenres.media_id === selectFilmId))
    ), [allFilmGenres])

    const handleDeleteGenre = (e, genreId) => {
        e.preventDefault()
        console.log(`I am deleting genre ${genreId}`)
    }

    //Add new genre to a film
    const handleAddGenre = (e, genreId) => {
        e.preventDefault()
        console.log(`i am adding genre ${genreId}`)
        const jsonData = {
            genreId,
            selectFilmId
        }
        fetch("/film_genres", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newFilmGenre => {
                setAllFilmGenres([...allFilmGenres, newFilmGenre])
            })
            .catch(error => console.error("Error adding genre"))
    }

    const renderGenres = everyGenre.map((genre, index) => {
        const isSelected = filmsGenres.some(film => film.genre_id === genre.id);
        return (
            <div
                key={index}
                // onClick={() => setSelectedGenreId(genre.id)}
                onClick={(e) => isSelected ? handleDeleteGenre(e, genre.id) : handleAddGenre(e, genre.id)}
                id={isSelected ? "selectedFilmGenre" : "unSelectedFilmGenre"}
            >
                {genre.genre}
            </div>
        );
    });

    return(
        <div
            id="filmGenreReel"
        >
            {renderGenres}
        </div>
    )
}