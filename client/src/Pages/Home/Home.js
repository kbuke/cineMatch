import Login from "../LoginPg/Login"
import InitialSignIn from "../InitialSignIn/InitialSignIn"

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
    setAllFollows
}){

    return(
        <>
            {!loggedUser?
                <Login 
                    Logo={Logo}
                    instaLogo={instaLogo}
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                />
                :
                !loggedUser.interests ?
                    <InitialSignIn 
                        allGenres={allGenres}
                        setAllGenres={setAllGenres}
                        userGenres={userGenres}
                        setUserGenres={setUserGenres}
                        loggedUser={loggedUser}
                        allUsers={allUsers}
                        allFollows={allFollows}
                        setAllFollows={setAllFollows}
                    />
                :
                null
            }
        </>
    )
}