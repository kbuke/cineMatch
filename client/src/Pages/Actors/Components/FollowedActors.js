import { useEffect, useState } from "react"

import "./FollowedActors.css"

import { RiUserUnfollowFill } from "react-icons/ri";

import UnfollowActor from "./Unfollow";

export default function FollowedActors({
    loggedUser,
    allFollows,
    setAllFollows
}){
    const [followingActors, setFollowingActors] = useState([])
    const [unfollowActor, setUnfollowActor] = useState(false)
    const [followId, setFollowId] = useState()
    const [unfollowName, setUnfollowName] = useState()
 
    useEffect(() => (
        setFollowingActors(allFollows.filter((user => user.followed_user.user_type==="Actor" && user.follower_user.id===loggedUser.id)))
    ), [allFollows])

    const handleUnfollow = (followId, actorName) => {
        setUnfollowActor(true)
        setFollowId(followId)
        setUnfollowName(actorName)
    }

    console.log(unfollowActor)
    console.log(`I am trying to unfollow number ${followId}`)


    //Create user card
    const actorCard=followingActors.map((actor, index) => (
        <div
            id="profileCard"
            key={index}
        >
            <img 
                src={actor.followed_user.profile_picture.picture_route}
                className="userCardPic"
            />

            <div>
                <h3
                    style={{marginBottom: "0px"}}
                >
                    {actor.followed_user.first_name} {actor.followed_user.last_name}
                </h3>

                <div
                    id="followUnfollowActorButton"
                    className="unfollowActorButton"
                    onClick={() => handleUnfollow(actor.id, `${actor.followed_user.first_name} ${actor.followed_user.last_name}`)}
                >  
                    <RiUserUnfollowFill 
                        id="followUnfollowButton"
                    />
                    <p
                        id="unfollowActorText"
                    >
                        Unfollow
                    </p>
                </div>
            </div>
        </div>
    ))

    return(
        <div>
            <h2>Your Favourite Actors</h2>
    
            <div
                id="faveActorRole"
            >
                {actorCard}
            </div>

            {unfollowActor ?
                <UnfollowActor 
                    unfollowName={unfollowName}
                    followId={followId}
                    setUnfollowActor={setUnfollowActor}
                    setAllFollows={setAllFollows}
                />
                :
                null
            }
        </div>
    )
}