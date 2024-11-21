import { useState } from "react";
import "./NewGenre.css";

export default function NewGenre({ 
    setAddNewGenre,
    allGenres,
    setAllGenres
 }) {
    const [newGenre, setNewGenre] = useState("")
    const [newGenreImg, setNewGenreImg] = useState("")

    const handleNewGenre = (e) => {
        e.preventDefault()
        const jsonData = {
            newGenre,
            newGenreImg
        }
        fetch("/genres", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(jsonData)
        })
            .then(r => r.json())
            .then(newGenre => {
                setAllGenres([...allGenres, newGenre])
                setAddNewGenre(false)
            })
            .catch(error => console.error("Error adding new genre"))
    }
    
    return (
        <div
            id="newGenreOverlay"
            onClick={() => setAddNewGenre(false)} // Close when clicking outside the form
        >
            <div
                id="newGenreContainer"
                onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
            >
                <form 
                    id="newGenreForm"
                    onSubmit={(e) => handleNewGenre(e)}
                >
                    <h2>Add a New Genre</h2>
                    <label>
                        Genre Name:
                        <input 
                            type="text" 
                            placeholder="Enter genre name" 
                            onChange={(e) => setNewGenre(e.target.value)}
                        />
                    </label>

                    <label>
                        Genre Image URL:
                        <input 
                            type="text" 
                            placeholder="Enter image URL" 
                            onChange={(e) => setNewGenreImg(e.target.value)}
                        />
                    </label>
                    <div id="newGenreButtons">
                        <button
                            type="button"
                            onClick={() => setAddNewGenre(false)} // Close the modal
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit"
                        >
                            Add Genre
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
