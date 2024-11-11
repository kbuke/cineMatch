import "./1-FaveGenres.css"
import { useState, useEffect } from "react"

export default function FaveGenre({
    allGenres,
    userGenres,
    setUserGenres,
    loggedUser
}){
    const [filterUserGenres, setFilterUserGenres] = useState([])
    console.log(userGenres)
    console.log(loggedUser)

    const userId = loggedUser.id

    useEffect(() => {
        setFilterUserGenres(userGenres.filter(details => details.user_id === userId))
    }, [userGenres])

    console.log(filterUserGenres)

    const alphabetGenres = allGenres.sort((a, b) => a.genre.localeCompare(b.genre))

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
        console.log(`user id is ${userId} and gere id is ${genreId}`)
        console.log(filterUserGenres)
        const userGenreRelation = filterUserGenres.filter(relation => relation.genre_id===genreId && relation.user_id===userId)
        console.log(userGenreRelation) 
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
            // onClick={(e) => handleNewGenre(e, genre.id)}
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
                style={{color: "white"}}
            >
                Favourite Genres
            </h1>

            <div
                id="genreGrid"
            >
                {renderGenres}
            </div>
        </>
    )
}