import { useEffect, useState } from "react"

import "./SpecificFilmCast.css"

//Edit button
import { CiEdit } from "react-icons/ci";

//Delete button
import { MdDelete } from "react-icons/md";

//Add button
import { IoIosAddCircleOutline } from "react-icons/io";
import AddCastMember from "./AddCastMember";

export default function SpecificFilmCast({
    filmCasts,
    setFilmCasts,
    selectFilmId,
    allUsers
}){
    const [specificFilmCast, setSpecificFilmCast] = useState([])
    const [addCast, setAddCast] = useState(false)
    

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
            {addCast ?
                <AddCastMember 
                    selectFilmId={selectFilmId}
                    filmCasts={filmCasts}
                    setFilmCasts={setFilmCasts}
                    setAddCast={setAddCast}
                    allUsers={allUsers}
                />
                :   
                <>
                    <h2
                        style={{textAlign: "center"}}
                    >
                        Cast
                    </h2>

                    <div
                        id="adminFilmCastReel"
                    >
                        <IoIosAddCircleOutline 
                            id="adminAddCast"
                            onClick={() => setAddCast(true)}
                        />

                        {renderCast}
                    </div>
                </>
            }
        </div>
    )
}