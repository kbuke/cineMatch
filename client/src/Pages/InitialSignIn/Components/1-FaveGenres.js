import "./1-FaveGenres.css"
import { useState, useEffect } from "react"


export default function FaveGenre({
    allGenres,
    userGenres,
    setUserGenres,
    loggedUser,
    setSelectedChoice
}){
    const [filterUserGenres, setFilterUserGenres] = useState([])

    const userId = loggedUser.id

    useEffect(() => {
        setFilterUserGenres(userGenres.filter(details => details.user_id === userId))
    }, [userGenres])

    const alphabetGenres = allGenres.sort((a, b) => a.genre.localeCompare(b.genre))

    console.log(allGenres)

    //Add genres to user favourite list
    const handleNewGenre = (e, genreId) => {
        e.preventDefault()
        const jsonData = {
            userId,
            genreId
        }
        fetch("/user_genres", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newGenre => {
            setUserGenres([...userGenres, newGenre])
        })
    }

    //Remove genres from favoruite list
    const deleteGenre = (e, genreId) => {
        e.preventDefault()
        const userGenreRelation = filterUserGenres.filter(relation => relation.genre_id===genreId && relation.user_id===userId)
        const relationId = userGenreRelation[0].id
        fetch(`/user_genres/${relationId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setUserGenres(genres => genres.filter(genre => genre.id !== relationId))
                }
            })
    }
   
    //Render genres
    const renderGenres = alphabetGenres.map((genre, index) => (
        <div
            className="genreContainer"
            style={{
                backgroundImage: `url(${genre.image})`,
            }}
            key={index}
            id={
                filterUserGenres.some(specificGenre => specificGenre.genre_id === genre.id) ? "selectedGenre" : "unSelectedGenre"
            }
            onClick={filterUserGenres.some(specificGenre => specificGenre.genre_id === genre.id) ? (e) => deleteGenre(e, genre.id) : (e) => handleNewGenre(e, genre.id)}
        >
            <div
                className="genreTitleContainer"
            >
                <h1
                    style={{
                        fontWeight: "300",
                        fontSize: "250%",
                        textDecoration: "underline"
                    }}
                >
                    {genre.genre}
                </h1>
            </div>
        </div>
    ))

    return(
        <>
            <h1
                className="initialHeaders"
            >
                Genres
            </h1>

            <h3
                style={{
                    color: "white",
                    textAlign: "center",
                    fontWeight: "200"
                }}
            >
                Please select your favourite genres from the selection below
            </h3>

            <div
                id="genreGrid"
            >
                {renderGenres}
            </div>

       
            <button
                onClick={() => setSelectedChoice("Actors")}
            >
                Next
            </button>

        </>
    )
}