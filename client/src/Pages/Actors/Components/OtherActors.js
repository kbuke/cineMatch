import { useEffect, useState } from "react";

import { RiUserFollowLine } from "react-icons/ri";

import "./OtherActors.css"

import NewFollow from "./NewFollow";

export default function OtherActors({ allFollows, allActors, loggedUser, setAllFollows }) {
    const [unFollowedActors, setUnFollowedActors] = useState([]);
    const [followNewActor, setFollowNewActor] = useState(false)
    const [chosenActor, setChosenActor] = useState()
    const [actorName, setActorName] = useState()

    useEffect(() => {
        // Extract the IDs of the actors that the loggedUser follows
        const followedActorIds = allFollows
            .filter(follow => follow.follower_user.id === loggedUser.id)
            .map(follow => follow.followed_user.id);

        // Filter actors that are not followed by the loggedUser
        const notFollowedActors = allActors.filter(actor => !followedActorIds.includes(actor.id) && loggedUser.id !== actor.id);

        setUnFollowedActors(notFollowedActors);
    }, [allFollows, allActors, loggedUser]);

    const handleFollow = (actorId, actorName) => {
        setFollowNewActor(true)
        setChosenActor(actorId)
        setActorName(actorName)
    }

    console.log(unFollowedActors);

    //Render unfollowed actors
    const actorCard = unFollowedActors.map((actor, index) => (
        <div
            id="profileCard"
            key={index}
        >
            <img 
                src={actor.profile_picture.picture_route}
                className="userCardPic"
            />

            <div>
                <h3
                    style={{marginBottom: "0px"}}
                >
                    {actor.first_name} {actor.last_name}
                </h3>

                <div
                    id="followUnfollowActorButton"
                    className="followButton"
                    onClick={() => handleFollow(actor.id, `${actor.first_name} ${actor.last_name}`)}
                >
                    <RiUserFollowLine 
                        id="followUnfollowButton"
                    />

                    <p
                        id="unfollowActorText"
                    >
                        Follow
                    </p>
                </div>
            </div>
        </div>
    ))

    return (
        <div>
            {followNewActor ?
                <NewFollow 
                    followsId={chosenActor}
                    actorName={actorName}
                    setFollowNewActor={setFollowNewActor}
                    followerId={loggedUser.id}
                    setAllFollows={setAllFollows}
                    allFollows={allFollows}
                />
                :
                null
            }

            <h2>Other Actors to Follow</h2>

            <div
                id="unfollowedActorGrid"
            >
                {actorCard}
            </div>
        </div>
    );
}
