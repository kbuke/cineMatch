import Login from "../LoginPg/Login"
import InitialSignIn from "../InitialSignIn/InitialSignIn"
import LoggedHome from "../LoggedInHome/LoggedHome"

import { useState } from "react"

export default function Home({
    Logo,
    instaLogo,
    loggedUser,
    setLoggedUser,
    allGenres,
    setAllGenres,
    userGenres,
    setUserGenres,
    allUsers,
    setAllUsers,
    allFollows,
    setAllFollows,
    allProfilePictures,
    setAllProfilePictures
}){

    return(
        <>
            {!loggedUser?
                <Login 
                    Logo={Logo}
                    instaLogo={instaLogo}
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                    allUsers={allUsers}
                    setAllUsers={setAllUsers}
                />
                :
                loggedUser && !loggedUser.interests ?
                    <InitialSignIn 
                        allGenres={allGenres}
                        setAllGenres={setAllGenres}
                        userGenres={userGenres}
                        setUserGenres={setUserGenres}
                        loggedUser={loggedUser}
                        allUsers={allUsers}
                        setAllUsers={setAllUsers}
                        allFollows={allFollows}
                        setAllFollows={setAllFollows}
                        allProfilePictures={allProfilePictures}
                        setAllProfilePictures={setAllProfilePictures}
                    />
                :
                loggedUser && loggedUser.interests ?
                    <LoggedHome 
                        setLoggedUser={setLoggedUser}
                    />
                :
                null
            }
        </>
    )
}