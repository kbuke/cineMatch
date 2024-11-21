import { useState } from "react"


export default function AdminAddFilm({
    allFilms,
    setAllFilms,
    setAddFilm
}){
    const [newFilmTitle, setNewFilmTitle] = useState("")
    const [newFilmSubTitle, setNewFilmSubTitle] = useState("")
    const [newFilmPoster, setNewFilmPoster] = useState("")
    const [newFilmReleaseDate, setNewFilmReleaseDate] = useState("")
    const [newFilmSummary, setNewFilmSummary] = useState("")
    const [newfilmBackground, setNewFilmBackground] = useState("")
    const [filmCountry, setFilmCountry] = useState("")
    const [filmHour, setFilmHour] = useState("")
    const [filmMinute, setFilmMinute] = useState("")

    const mediaType = "Movie"

    //POST new film
    const handleNewFilm = (e) => {
        e.preventDefault()
        const jsonData = {
            newFilmTitle,
            newFilmSubTitle,
            newFilmPoster,
            newFilmReleaseDate,
            newFilmSummary,
            newfilmBackground,
            filmCountry,
            mediaType,
            filmHour,
            filmMinute
        }
        fetch("/films", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newFilm => {
                setAllFilms([...allFilms, newFilm])
            })
            .then(setAddFilm(false))
            .catch(error => console.error("Error adding new film"))
    }
    return(
        <div
            id="overlay"
        >
            <div
                id="newContainer"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    id="newForm"
                    onSubmit={(e) => handleNewFilm(e)}
                >
                    <h2>Add a New Film</h2>

                    <label>
                        Film Title
                        <input 
                            type="text"
                            placeholder="Enter the name of the film"
                            onChange={(e) => setNewFilmTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Sub Title
                        <input 
                            type="text"
                            placeholder="Enter the sub-title of the film"
                            onChange={(e) => setNewFilmSubTitle(e.target.value)}
                        />
                    </label>

                    <label>
                        Poster 
                        <input 
                            type="text"
                            placeholder="Enter a link for the films poster"
                            onChange={(e) => setNewFilmPoster(e.target.value)}
                        />
                    </label>

                    <label>
                        Enter the films release date 
                        <input 
                            type="date"
                            onChange={(e) => setNewFilmReleaseDate(e.target.value)}
                        />
                    </label>

                    <label>
                        Summary
                        <input 
                            type="text"
                            placeholder="Enter a summary for the film"
                            onChange={(e) => setNewFilmSummary(e.target.value)}
                        />
                    </label>

                    <label>
                        Cover Photo 
                        <input 
                            type="text"
                            placeholder="Enter a link for your films cover photo"
                            onChange={(e) => setNewFilmBackground(e.target.value)}
                        />
                    </label>

                    <label>
                        Origin Country
                        <input 
                            type="text"
                            placeholder="Enter the country the film was made"
                            onChange={(e) => setFilmCountry(e.target.value)}
                        />
                    </label>

                    <label>
                        Film Run-Time (HOURS)
                        <input 
                            type="integer"
                            placeholder="Please enter the films hours"
                            onChange={(e) => setFilmHour(e.target.value)}
                        />
                    </label>

                    <label>
                        Film§ Run-Time (MINUTES)
                        <input 
                            type="integer"
                            placeholder="Please enter the films minutes"
                            onChange={(e) => setFilmMinute(e.target.value)}
                        />
                    </label>

                    <div
                        id="newButtons"
                    >
                        <button
                            type="button"
                            onClick={() => setAddFilm(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}