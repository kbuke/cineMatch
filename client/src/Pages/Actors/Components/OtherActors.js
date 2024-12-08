import { useEffect, useState } from "react";

import { RiUserFollowLine } from "react-icons/ri";

import "./OtherActors.css"

export default function OtherActors({ allFollows, allActors, loggedUser }) {
    const [unFollowedActors, setUnFollowedActors] = useState([]);

    useEffect(() => {
        // Extract the IDs of the actors that the loggedUser follows
        const followedActorIds = allFollows
            .filter(follow => follow.follower_user.id === loggedUser.id)
            .map(follow => follow.followed_user.id);

        // Filter actors that are not followed by the loggedUser
        const notFollowedActors = allActors.filter(actor => !followedActorIds.includes(actor.id));

        setUnFollowedActors(notFollowedActors);
    }, [allFollows, allActors, loggedUser]);

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
            <h2>Other Actors to Follow</h2>

            <div>
                {actorCard}
            </div>
        </div>
    );
}
