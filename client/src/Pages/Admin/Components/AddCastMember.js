
import "./AddCastMember.css";
import { useState, useEffect } from "react";

export default function AddCastMember({
    selectFilmId,
    filmCasts,
    setFilmCasts,
    setAddCast,
    allUsers,
}) {
    const [allActors, setAllActors] = useState([]);
    const [newActor, setNewActor] = useState("");
    const [actorId, setActorId] = useState();
    const [actorBilling, setActorBilling] = useState();

    // Filter all actors
    useEffect(() => {
        setAllActors(allUsers.filter(user => user.user_type === "Actor"));
    }, [allUsers]);

    const filterActors = allActors.filter(actor =>
        `${actor.first_name} ${actor.last_name}`
            .toLowerCase()
            .includes(newActor.toLowerCase())
    );

    const handleNewActor = (e) => {
        e.preventDefault()
        const jsonData = {
            selectFilmId,
            actorId,
            actorBilling
        }
        fetch("/film_cast", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newActor => {
                setFilmCasts([...filmCasts, newActor])
                setAddCast(false)
            })
            .catch(error => console.error("Error adding new cast member"))
    }

    return (
        <form 
            id="adminNewCastForm"
            onSubmit={(e) => handleNewActor(e)}
        >
            <h2 style={{ textAlign: "center" }}>Add New Cast Member</h2>

            <input
                placeholder="Enter the name of the actor"
                id="adminAddFilmInput"
                onChange={(e) => setNewActor(e.target.value)}
                value={newActor}
            />

            <input
                id="adminAddFilmInput"
                placeholder="Enter the billing NUMBER of the actor"
                onChange={(e) => setActorBilling(parseInt(e.target.value, 10))}
                value={actorBilling}
            />

            {/* Display filtered actors */}
            <div id="filteredActors">
                {filterActors.map((actor) => (
                    <div
                        key={actor.id}
                        style={{
                            border: "1px solid #ccc",
                            padding: "5px",
                            margin: "5px 0",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            setActorId(actor.id);
                            setNewActor(`${actor.first_name} ${actor.last_name}`);
                        }}
                    >
                        {actor.first_name} {actor.last_name}
                    </div>
                ))}
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    justifySelf: "center",
                    alignSelf: "center",
                    marginBottom: "10px",
                }}
            >
                <button
                    style={{ backgroundColor: "red", color: "white", border: "none" }}
                    onClick={(e) => {
                        e.preventDefault();
                        setAddCast(false);
                    }}
                >
                    Cancel
                </button>

                <button
                    style={{ backgroundColor: "green", color: "white", border: "none" }}
                    type="submit"
                >
                    Submit
                </button>
            </div>
        </form>
    );
}
