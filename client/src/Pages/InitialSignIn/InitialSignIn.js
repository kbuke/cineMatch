import { useEffect, useState } from "react"

import FaveGenre from "./Components/1-FaveGenres"
import FaveActors from "./Components/2-FaveActors"
import FaveDirector from "./Components/3-FaveDirectors"
import UploadPic from "./Components/4-UploadPic"

import "./InitialSignIn.css"

export default function InitialSignIn({
    appData,
    loggedUser
}){

    const allGenres = appData.allGenres
    const setAllGenres = appData.setAllGenres
    const userGenres = appData.userGenres
    const setUserGenres = appData.setUserGenres
    const allUsers = appData.allUsers
    const allFollows = appData.allFollows
    const setAllFollows = appData.setAllFollows
    const allProfilePictures = appData.allProfilePictures
    const setAllProfilePictures = appData.setAllProfilePictures
    const setAllUsers = appData.setAllUsers
    const Logo = appData.Logo

    const [selectedChoice, setSelectedChoice] = useState("Genres")


    return(
        <div
            style={{backgroundColor: "black", height: "100vh", marginTop: "0px", overflowY: "auto", color: "white", textAlign: "center", width: "100%"}}
        >
            <div
                className="logoImg"
            >
                <img 
                    src={Logo}
                    className="logo"
                />
            </div>
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
                        allUsers={allUsers}
                        loggedUser={loggedUser}
                        allFollows={allFollows}
                        setAllFollows={setAllFollows}
                    />
                :
                selectedChoice === "Profile Picture"?
                    <UploadPic 
                        loggedUser={loggedUser}
                        allUsers={allUsers}
                        allProfilePictures={allProfilePictures}
                        setAllProfilePictures={setAllProfilePictures}
                        setAllUsers={setAllUsers}
                    />
                :
                null
            }
            
        </div>
    )
}