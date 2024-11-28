import { useEffect, useState } from "react"

import "./SpecificFilmCast.css"

//Edit button
import { CiEdit } from "react-icons/ci";

//Delete button
import { MdDelete } from "react-icons/md";

export default function SpecificFilmCast({
    filmCasts,
    setFilmCasts,
    selectFilmId
}){
    const [specificFilmCast, setSpecificFilmCast] = useState([])

    useEffect(() => (
        setSpecificFilmCast(filmCasts.filter(filmCast => filmCast.media_id === selectFilmId))
    ), [filmCasts])

    console.log(specificFilmCast)

    const renderCast = specificFilmCast.map((cast, index) => (
        <div
            key={index}
            id="adminFilmCastCard"
        >
            <img 
                src={cast.user.profile_picture.picture_route}
                id="adminFilmCastCardImg"
            />

            <h2>
                {cast.user.first_name} {cast.user.last_name}
            </h2>

            <div
                id="adminCastOptionGrid"
            >
                <CiEdit 
                    className="adminCastOptionGridButtons"
                />

                <MdDelete 
                    className="adminCastOptionGridButtons"
                />
            </div>
        </div>
    ))

    return(
        <div>
            <h2
                style={{textAlign: "center"}}
            >
                Cast
            </h2>

            <div
                id="adminFilmCastReel"
            >
                {renderCast}
            </div>
        </div>
    )
}