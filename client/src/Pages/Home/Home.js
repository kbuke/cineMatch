import Login from "../LoginPg/Login"
import InitialSignIn from "../InitialSignIn/InitialSignIn"
import LoggedHome from "../LoggedInHome/LoggedHome"

import { useState } from "react"

import { useOutletContext } from "react-router-dom"

export default function Home(){
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
                />
                :
                loggedUser && !loggedUser.interests ?
                    <InitialSignIn 
                        loggedUser={loggedUser}
                        appData={appData}
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