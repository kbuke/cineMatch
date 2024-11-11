import Login from "../LoginPg/Login"

import { useState } from "react"

export default function Home({
    Logo,
    instaLogo,
    loggedUser,
    setLoggedUser
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
                null
            }
        </>
    )
}