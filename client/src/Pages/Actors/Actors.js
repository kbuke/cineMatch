import { useOutletContext } from "react-router-dom"

import FollowedActors from "./Components/FollowedActors"
import OtherActors from "./Components/OtherActors"

export default function Actors(){
    const appData = useOutletContext()
    
    //find logged user
    const loggedUser = appData.loggedUser
    
    //Find all follows
    const allFollows = appData.allFollows
    const setAllFollows = appData.setAllFollows

    //Find all actors
    const allUsers = appData.allUsers
    const allActors = allUsers.filter(user => user.user_type==="Actor")


    return(
        <div
            id="actorHomePg"
            style={{
                marginLeft: "10px",
                overflowY: "auto",
                width: "100%"
            }}
        >
            <FollowedActors 
                loggedUser={loggedUser}
                allFollows={allFollows}
                setAllFollows={setAllFollows}
            />

            <OtherActors 
                allFollows={allFollows}
                allActors={allActors}
                loggedUser={loggedUser}
            />
        </div>
    )
}