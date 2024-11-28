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
import AdminFilms from "./Components/AdminFilms";

import { useState } from "react";

export default function Admin(){
    //Set state
    const [update, setUpdate] = useState(false)

    const [selectedId, setSelectedId] = useState()
    const [currentGenre, setCurrentGenre] = useState()
    const [currentGenreImg, setCurrentGenreImg] = useState()

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

    //Hanlde films
    const allFilms = appData.allFilms
    const setAllFilms = appData.setAllFilms

    //Handle film genres
    const allFilmGenres = appData.allFilmGenres
    const setAllFilmGenres = appData.setAllFilmGenres

    //Hanlde film casts 
    const filmCasts = appData.filmCasts
    const setFilmCasts = appData.setFilmCasts


    return(
        <div
            id="adminPgContainer"
            style={{marginLeft: "10px", marginRight: "10px", overflowY: 'auto'}}
        >
            <h1
                id="adminFilmPgHeader"
            >
                Admin Page, Welcome!
            </h1>

            <div
                id="adGenreContainer"
                style={{
                    justifyContent: "center",
                    alignContent: "center",
                    display: "flex",
                    flexDirection: "column",
                    borderBottom: "solid"
                }}
            >
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

                        currentGenre={currentGenre}
                        setCurrentGenre={setCurrentGenre}

                        currentGenreImg={currentGenreImg}
                        setCurrentGenreImg={setCurrentGenreImg}
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
                    setCurrentGenre={setCurrentGenre}
                    setCurrentGenreImg={setCurrentGenreImg}
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

            <>
                <AdminFilms 
                    allFilms={allFilms}
                    setAllFilms={setAllFilms}
                    AddButton={AddButton}
                    allGenres={allGenres}
                    allFilmGenres={allFilmGenres}
                    setAllFilmGenres={setAllFilmGenres}
                    filmCasts={filmCasts}
                    setFilmCasts={setFilmCasts}
                />
            </>
        </div>
    )
}