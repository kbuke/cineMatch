import Login from "../LoginPg/Login"
import InitialSignIn from "../InitialSignIn/InitialSignIn"
import LoggedHome from "../LoggedInHome/LoggedHome"

import { useState } from "react"

import { useOutletContext } from "react-router-dom"

export default function Home({
    // Logo,
    // instaLogo,
    // // loggedUser,
    // setLoggedUser,
    // allGenres,
    // setAllGenres,
    // userGenres,
    // setUserGenres,
    // allUsers,
    // setAllUsers,
    // allFollows,
    // setAllFollows,
    // allProfilePictures,
    // setAllProfilePictures
}){
    const appData = useOutletContext()
    console.log(appData)
    const loggedUser = appData.loggedUser
    console.log(loggedUser)
    const setLoggedUser = appData.setLoggedUser
    return(
        <>
            {!loggedUser?
                <Login 
                    appData={appData}
                    loggedUser={loggedUser}
                    // Logo={Logo}
                    // instaLogo={instaLogo}
                    // loggedUser={loggedUser}
                    // setLoggedUser={setLoggedUser}
                    // allUsers={allUsers}
                    // setAllUsers={setAllUsers}
                />
                :
                loggedUser && !loggedUser.interests ?
                    <InitialSignIn 
                        loggedUser={loggedUser}
                        appData={appData}
                        // allGenres={allGenres}
                        // setAllGenres={setAllGenres}
                        // userGenres={userGenres}
                        // setUserGenres={setUserGenres}
                        // loggedUser={loggedUser}
                        // allUsers={allUsers}
                        // setAllUsers={setAllUsers}
                        // allFollows={allFollows}
                        // setAllFollows={setAllFollows}
                        // allProfilePictures={allProfilePictures}
                        // setAllProfilePictures={setAllProfilePictures}
                        // Logo={Logo}
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