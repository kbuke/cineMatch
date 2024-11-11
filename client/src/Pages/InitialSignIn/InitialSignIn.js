import { useEffect, useState } from "react"

import FaveGenre from "./Components/1-FaveGenres"
import FaveActors from "./Components/2-FaveActors"
import FaveDirector from "./Components/3-FaveDirectors"
import UploadPic from "./Components/4-UploadPic"

export default function InitialSignIn({
    allGenres,
    setAllGenres,
    userGenres,
    setUserGenres,
    loggedUser,
    allUsers,
    allFollows,
    setAllFollows,
    allProfilePictures,
    setAllProfilePictures
}){

    const [selectedChoice, setSelectedChoice] = useState("Genres")

    console.log(`i HAVE SELECTED ${selectedChoice}`)

    return(
        <div
            style={{backgroundColor: "black", height: "100vh", marginTop: "0px", overflowY: "auto", color: "white", textAlign: "center"}}
        >
            {
                selectedChoice === "Genres"?
                    <FaveGenre 
                        allGenres={allGenres}
                        userGenres={userGenres}
                        setUserGenres={setUserGenres}
                        loggedUser={loggedUser}
                        setSelectedChoice={setSelectedChoice}
                    />
                :
                selectedChoice === "Actors"?
                    <FaveActors 
                        allUsers={allUsers}
                        setSelectedChoice={setSelectedChoice}
                        loggedUser={loggedUser}
                        allFollows={allFollows}
                        setAllFollows={setAllFollows}
                    />
                :
                selectedChoice === "Directors"?
                    <FaveDirector 
                        setSelectedChoice={setSelectedChoice}
                    />
                :
                selectedChoice === "Profile Picture"?
                    <UploadPic 
                        loggedUser={loggedUser}
                        allUsers={allUsers}
                        allProfilePictures={allProfilePictures}
                        setAllProfilePictures={setAllProfilePictures}
                    />
                :
                null
            }
            
        </div>
    )
}