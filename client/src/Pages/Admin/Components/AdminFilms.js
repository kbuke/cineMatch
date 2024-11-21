import { useEffect, useState } from "react"

import "./AdminFilms.css"

import AdminAddFilm from "./AdminAddFilm"

export default function AdminFilms({
    allFilms,
    setAllFilms,
    AddButton
}){
    console.log(allFilms)
    const [registeredFilms, setRegisteredFilms] = useState()
    const [addFilm, setAddFilm] = useState(false)

    useEffect(() => (
        setRegisteredFilms(allFilms.map(film => film))
    ), [allFilms])
    
    //Render films
    const renderFilms = registeredFilms?.map((film, index) => (
        <div
            key={index}
            id="adminFilmContainer"
        >
            <img 
                src={film.poster}
                id="adminFilmPoster"
            />

            <div
                id="adminFilmBasicInfo"
            >
                <h2
                    className="adminFilmTitle"
                    style={{marginBottom: "0px"}}
                >
                    {film.name}
                </h2>

                <h4
                    className="adminFilmSubTitle"
                    style={{marginTop: "0px", marginBottom: "4px"}}
                >
                    {film.sub_title}
                </h4>

                <h5
                    style={{marginTop: "0px"}}
                >
                    ({film.release_date.slice(0, 4)})
                </h5>
            </div>
        </div>
    ))

    return(
        <div>
            {addFilm ?
                <AdminAddFilm 
                    setAllFilms={setAllFilms}
                    allFilms={allFilms}
                    setAddFilm={setAddFilm}
                />
                :
                null
            }

            <h2>
                Registered Films ({allFilms.length})
            </h2>

            <div
                id="adminFilmReel"
            >
                {renderFilms}
            </div>

            <AddButton 
                id="adminAddButton"
                onClick={() => setAddFilm(true)}
            />
        </div>
    )
}