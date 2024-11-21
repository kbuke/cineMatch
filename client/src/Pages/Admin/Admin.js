import "./Admin.css"

//Use this page to add movies, tv shows, genres etc
import { useOutletContext } from "react-router-dom"

//Edit button
import { CiEdit } from "react-icons/ci";

//Delete button
import { MdDelete } from "react-icons/md";

//Add button
import { IoIosAddCircleOutline } from "react-icons/io";

import AdminGenres from "./Components/AdminGenres";
import NewGenre from "./Components/NewGenre";

import { useState } from "react";

export default function Admin(){
    //Set state
    const [update, setUpdate] = useState(false)

    const [selectedId, setSelectedId] = useState()

    const [addNewGenre, setAddNewGenre] = useState(false)
    const [editGenre, setEditGenre] = useState(false)
    const [deleteGenre, setDeleteGenre] = useState(false)

    //Handle new genre
    const handleGenre = () => {
        setUpdate(true)
        setAddNewGenre(true)
    }

    const appData = useOutletContext()

    //Handle buttons for ease
    const editButton = CiEdit

    const deleteButton = MdDelete

    const AddButton = IoIosAddCircleOutline

    //Handle genres
    const allGenres = appData.allGenres
    const setAllGenres = appData.setAllGenres


    return(
        <div
            id="adminPgContainer"
            style={{marginLeft: "10px", marginRight: "10px", overflowY: 'auto'}}
        >
            <h1>Admin Page, Welcome!</h1>

            <h2>Registered Genres ({allGenres.length})</h2>

            {update ?
                <NewGenre 
                    allGenres={allGenres}
                    setAllGenres={setAllGenres}

                    addNewGenre={addNewGenre}
                    setAddNewGenre={setAddNewGenre}

                    editGenre={editGenre}
                    setEditGenre={setEditGenre}

                    deleteGenre={deleteGenre}
                    setDeleteGenre={setDeleteGenre}

                    setUpdate={setUpdate}

                    selectedId={selectedId}
                />
                :
                null
            }

            <AdminGenres 
                allGenres={allGenres}
                setAllGenres={setAllGenres}
                EditButton={editButton}
                DeleteButton={deleteButton}
                setEditGenre={setEditGenre}
                setSelectedId={setSelectedId}
                setDeleteGenre={setDeleteGenre}
                setUpdate={setUpdate}
            />

            <AddButton 
                id="adminAddButton"
                onClick={() => handleGenre()}
            />
            <p
                id="adminComment"
            >
                Add New Genre
            </p>
        </div>
    )
}