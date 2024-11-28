import { useEffect, useState } from "react";

import "./SpecificFilmGenres.css"

export default function SpecificFilmGenres({
    selectFilmId,
    allGenres,
    allFilmGenres,
    setAllFilmGenres
}){
    const [filmsGenres, setFilmsGenres] = useState([])
    const [everyGenre, setEveryGenre] = useState([])

    useEffect(() => (
        setEveryGenre(allGenres)
    ), [allGenres])

    useEffect(() => (
        setFilmsGenres(allFilmGenres.filter(filmGenres => filmGenres.media_id === selectFilmId))
    ), [allFilmGenres])

    const handleDeleteGenre = (e, genreId) => {
        e.preventDefault()
        console.log(`I am deleting genre ${genreId}`)
        const filmsGenreId = filmsGenres.filter(film => film.genre_id === genreId)[0].id
        console.log(filmsGenreId)
        fetch(`/film_genres/${filmsGenreId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setAllFilmGenres(genres => genres.filter(genre => genre.id !== filmsGenreId))
                }
            })
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