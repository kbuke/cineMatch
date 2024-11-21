import { useState } from "react";
import "./NewGenre.css";

export default function NewGenre({ 
    allGenres,
    setAllGenres,

    addNewGenre, 
    setAddNewGenre,

    editGenre,
    setEditGenre,

    deleteGenre,
    setDeleteGenre,

    setUpdate,

    selectedId
 }) {
    console.log(`I am CREATING a new genre: ${addNewGenre}, I am EDITING a genre: ${editGenre}, or I am DELETING a genre: :${deleteGenre}`)

    const [newGenre, setNewGenre] = useState("")
    const [newGenreImg, setNewGenreImg] = useState("")

    //Handle closing pop up
    const handleClose = () => {
        setUpdate(false)
        if (addNewGenre) setAddNewGenre(false);
        if (editGenre) setEditGenre(false);
        if (deleteGenre) setDeleteGenre(false);
    }

    //POST new genre
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

    //DELETE genre
    const handleDelete = (e) => {
        e.preventDefault()
        fetch(`/genres/${selectedId}`, {
            method: "DELETE"
        })
            .then(r => {
                if(r.ok) {
                    setAllGenres(genres => genres.filter(genre => genre.id !== selectedId))
                }
            })
            .then(setUpdate(false))
    }

    //EDIT genre
    const handleEdit = (e) => {
        e.preventDefault()
    }
    
    return (
        <div
            id="newGenreOverlay"
            onClick={() => handleClose()} // Close when clicking outside the form
        >
            <div
                id="newGenreContainer"
                onClick={(e) => e.stopPropagation()} // Prevent click events from propagating to the overlay
            >
                <form 
                    id="newGenreForm"
                    onSubmit={
                        addNewGenre ?
                            (e) => handleNewGenre(e)
                        :
                        editGenre ?
                            (e) => handleEdit(e)
                        :
                            (e) => handleDelete(e)
                    }
                >
                    {/* <h2>Add a New Genre</h2> */}
                    {   
                        addNewGenre ? 
                            <h2>Add a New Genre</h2>
                        :
                        editGenre ?
                            <h2>Edit Genre</h2>
                        :
                            <h2>Delete Genre</h2>
                    }

                    {addNewGenre || editGenre ?
                        <>
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
                        </>
                        :
                        null
                    }
                    <div id="newGenreButtons">
                        <button
                            type="button"
                            onClick={() => handleClose()} // Close the modal
                        >
                            Cancel
                        </button>

                        <button 
                            type="submit"
                        >
                            {
                                addNewGenre ?
                                    "Add New Genre"
                                :
                                editGenre ?
                                    "Edit Genre"
                                :
                                    "Delete Genre"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
