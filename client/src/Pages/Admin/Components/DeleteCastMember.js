

export default function DeleteCastMember({
    selectedActorId,
    selectFilmId,
    setDeleteCast,
    selectedCastId,
    setFilmCasts
}){

    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/film_cast/${selectedCastId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok){
                    setFilmCasts(casts => casts.filter(cast => cast.id !== selectedCastId))
                }
            })
            .then(setDeleteCast(false))
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
                    onSubmit={(e) => handleDelete(e)}
                >
                    <h2
                        style={{
                            color: "black",
                            textAlign: "center"
                        }}
                    >
                        Delete Cast Member from Film?
                    </h2>

                    <div
                        id="newButtons"
                    >
                        <button
                            onClick={() => setDeleteCast(false)}
                            type="button"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                        >
                            Delete
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}