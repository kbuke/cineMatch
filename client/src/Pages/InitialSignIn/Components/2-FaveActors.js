import { act, useEffect, useState } from "react"

import "./2-FaveActors.css"


export default function FaveActors({
    allUsers,
    setSelectedChoice,
    loggedUser,
    allFollows,
    setAllFollows
}){
    console.log(allUsers)
    const followerId = loggedUser.id

    const [filterActors, setFilterActors] = useState([])
    const [filterFollowers, setFilterFollowers] = useState([])

    useEffect(() => (
        setFilterActors(allUsers.filter(user => user.user_type==="Actor" && user.id !== loggedUser.id))
    ), [allUsers])

    useEffect(() => (
        setFilterFollowers(allFollows.filter(followers => followers.follower_id === followerId))
    ), [allFollows])
    console.log(filterFollowers)

    //Handle logic for new follow
    const handleNewFollow = (e, followsId) => {
        e.preventDefault()
        const jsonData = {
            followerId, 
            followsId
        }
        fetch("/followers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
        .then(r => r.json())
        .then(newFollow => {
            setAllFollows([...allFollows, newFollow])
        })
    }

    //Handle deleting actors from fave
    // Handle deleting actors from fave
    const handleDelete = (e, followsId) => {
        e.preventDefault();
        const followRelation = filterFollowers.find(
            relation => relation.follower_id === followerId && relation.follows_id === followsId
        );

        if (followRelation) {
            const relationId = followRelation.id;
            fetch(`/followers/${relationId}`, {
                method: "DELETE"
            })
            .then(r => {
                if (r.ok) {
                    setAllFollows(follows => follows.filter(follow => follow.id !== relationId));
                }
            });
        }
    };


    const renderActors = filterActors.map((actor, index) => (
        <div
            className="initialActorCard"
            key={index}
            // onClick={(e) => handleNewFollow(e, actor.id)}
            onClick={filterFollowers.some(specificFollow => specificFollow.follows_id === actor.id) ? (e) => handleDelete(e, actor.id) : (e) => handleNewFollow(e, actor.id)}
        >
            <img 
                src={actor.profile_picture.picture_route}
                id={
                    filterFollowers.some(specificFollow => specificFollow.follows_id === actor.id) ? "selectedGenre" : "unSelectedGenre"
                }
                className="userImg"
            />

            <h3>{actor.first_name} {actor.last_name}</h3>
        </div>
    ))

    console.log(filterActors)
    return(
        <>
            <h1
                className="initialHeaders"
            >
                Actors
            </h1>

            <h3>Please select some of your favourite Actors</h3>

            <div
                id="initialActorGrid"
            >
                {renderActors}
            </div>

            <div>
                <button
                    onClick={() => setSelectedChoice("Genres")}
                >
                    Previous
                </button>

                <button
                    onClick={() => setSelectedChoice("Directors")}
                >
                    Next
                </button>
            </div>
        </>
    )
}