

export default function NewFollow({
    followsId,
    actorName,
    setFollowNewActor,
    followerId,
    setAllFollows,
    allFollows
}){
    const handleNewFollow = (e) => {
        e.preventDefault()
        const jsonData = {
            followerId,
            followsId
        }   
        fetch('/followers', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newFollow => {
                setAllFollows([...allFollows, newFollow])
                setFollowNewActor(false)
            })
            .catch(error => console.error("Error adding new follow"))
    }

    return(
        <div
            id="overlay"
        >
            <div
                id="newContainer"
                onClick={(e) => e.stopPropagation()}
            >
                <form
                    id="newForm"
                    onSubmit={(e) => handleNewFollow(e)}
                >
                    <h2>Follow {actorName}</h2>

                    <div
                        id="newButtons"
                    >
                        <button
                            type="button"
                            onClick={() => setFollowNewActor(false)}
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                        >
                            Subscribe
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}