import { useEffect, useState } from "react"

import "./SpecificFilmCast.css"

//Edit button
import { CiEdit } from "react-icons/ci";

//Delete button
import { MdDelete } from "react-icons/md";

//Add button
import { IoIosAddCircleOutline } from "react-icons/io";

import AddCastMember from "./AddCastMember";
import DeleteCastMember from "./DeleteCastMember";

export default function SpecificFilmCast({
    filmCasts,
    setFilmCasts,
    selectFilmId,
    allUsers
}){
    const [specificFilmCast, setSpecificFilmCast] = useState([])
    const [addCast, setAddCast] = useState(false)
    const [deleteCast, setDeleteCast] = useState(false)
    const [selectedCastId, setSelectedCastId] = useState()
    const [selectedActorId, setSelectedActorId] = useState()
    

    useEffect(() => (
        setSpecificFilmCast(filmCasts.filter(filmCast => filmCast.media_id === selectFilmId))
    ), [filmCasts])

    console.log(specificFilmCast)

    //Handle delete logic
    const handleDelete = (castId, actorId) => {
        setSelectedCastId(castId)
        setSelectedActorId(actorId)
        setDeleteCast(true)
    }

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
                    onClick={() => handleDelete(cast.id, cast.actor_id)}
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
            deleteCast ?
                <DeleteCastMember 
                    selectedActorId={selectedActorId}
                    selectFilmId={selectFilmId}
                    setDeleteCast={setDeleteCast}
                    selectedCastId={selectedCastId}
                    setFilmCasts={setFilmCasts}
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