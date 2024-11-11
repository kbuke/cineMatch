import { useEffect, useState } from "react"

import FaveGenre from "./Components/1-FaveGenres"
import FaveActors from "./Components/2-FaveActors"

export default function InitialSignIn({
    allGenres,
    setAllGenres,
    userGenres,
    setUserGenres,
    loggedUser,
    allUsers,
    allFollows,
    setAllFollows
}){

    const [selectedChoice, setSelectedChoice] = useState("Genres")

    return(
        <div
            style={{backgroundColor: "black", height: "100vh", marginTop: "0px", overflowY: "auto", color: "white"}}
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
                null
            }
            
        </div>
    )
}