import { useEffect, useState } from "react"

export default function FaveDirector({
    allUsers,
    setSelectedChoice,
    loggedUser,
    allFollows,
    setAllFollows
}){
    console.log(allUsers)
    const followerId = loggedUser.id

    const [filterDirectors, setFilterDirectors] = useState([])
    const [filterFollowers, setFilterFollowers] = useState([])

    useEffect(() => (
        setFilterDirectors(allUsers.filter(user => user.user_type==="Director"))
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


    const renderDirectors = filterDirectors.map((director, index) => (
        <div
            className="initialActorCard"
            key={index}
            // onClick={(e) => handleNewFollow(e, actor.id)}
            onClick={filterFollowers.some(specificFollow => specificFollow.follows_id === director.id) ? (e) => handleDelete(e, director.id) : (e) => handleNewFollow(e, director.id)}
        >
            <img 
                src={director.profile_picture.picture_route}
                id={
                    filterFollowers.some(specificFollow => specificFollow.follows_id === director.id) ? "selectedGenre" : "unSelectedGenre"
                }
                className="userImg"
            />

            <h3>{director.first_name} {director.last_name}</h3>
        </div>
    ))

    console.log(filterDirectors)
    return(
        <>
            <h1
                className="initialHeaders"
            >
                Directors
            </h1>

            <h3>Please select some of your favourite Directors</h3>

            <div
                id="initialActorGrid"
            >
                {renderDirectors}
            </div>

            <div>
                <button
                    onClick={() => setSelectedChoice("Actors")}
                >
                    Previous
                </button>

                <button
                    onClick={() => setSelectedChoice("Profile Picture")}
                >
                    Next
                </button>
            </div>
        </>
    )
}