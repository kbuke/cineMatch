import Login from "../LoginPg/Login"

import { useState } from "react"

export default function Home({
    Logo,
    instaLogo
}){
    const [loggedIn, setLoggedIn] = useState(false)

    return(
        <>
            {!loggedIn?
                <Login 
                    Logo={Logo}
                    instaLogo={instaLogo}
                />
                :
                null
            }
        </>
    )
}