import { useEffect, useState } from "react"
import FaveGenre from "./Components/1-FaveGenres"

export default function InitialSignIn({
    allGenres,
    setAllGenres,
    userGenres,
    setUserGenres,
    loggedUser
}){

    return(
        <div
            style={{backgroundColor: "black", height: "100vh", marginTop: "0px"}}
        >
            <FaveGenre 
                allGenres={allGenres}
                userGenres={userGenres}
                setUserGenres={setUserGenres}
                loggedUser={loggedUser}
            />
        </div>
    )
}