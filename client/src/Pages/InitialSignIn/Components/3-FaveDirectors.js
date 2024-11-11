

export default function FaveDirector({
    setSelectedChoice
}){
    return(
        <div
            style={{color: "white"}}
        >
            <h1>Directors</h1>
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
        </div>
    )
}