import "./HorizontalNav.css"

import { AiOutlineBars } from "react-icons/ai";

import { TiThMenuOutline } from "react-icons/ti";

export default function HorizontalNav({
    loggedUser,
    Logo
}){

    return(
        loggedUser && loggedUser.interests ?
            <div
                id="horizontalNavBar"
            >
                <>
                    <TiThMenuOutline 
                        id="verticalNavButton"
                    />
                </>

                <img 
                    src={Logo}
                    style={{
                        height: "90px",
                        width: "180px"
                    }}
                />

    
                <input 
                    placeholder="🔍 Search"
                    id="searchBar"
                />

            </div>
            :
            null
    )
}