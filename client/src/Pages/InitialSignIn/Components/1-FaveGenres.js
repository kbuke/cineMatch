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
        console.log("hi")
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
            onClick={(e) => handleNewGenre(e, genre.id)}
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