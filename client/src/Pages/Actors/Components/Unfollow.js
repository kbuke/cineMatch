

export default function UnfollowActor({
    unfollowName,
    setUnfollowActor,
    followId,
    setAllFollows
}){

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/followers/${followId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setAllFollows(followers => followers.filter(follower => follower.id !== followId))
                }
            })
            .then(setUnfollowActor(false))
    }

    return(
        <div
            id="overlay"
        >
            <div
                id="newContainer"
            >
                <form
                    id="newForm"
                    onSubmit={(e) => handleDelete(e)}
                >
                    <h1>Unfollow {unfollowName}?</h1>

                    <div
                        id="newButtons"
                    >
                        <button
                            type="button"
                            onClick={() => setUnfollowActor(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                        >
                            Unsubscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}