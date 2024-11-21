import { useEffect, useState } from "react";
import "./AdminGenres.css";

export default function AdminGenres({
    allGenres,
    AddButton,
    EditButton,
    DeleteButton,
    setEditGenre,
    setSelectedId,
    setDeleteGenre,
    setUpdate
}) {
    const [adminGenres, setAdminGenres] = useState([]);
    
    console.log(AddButton)

    useEffect(() => {
        setAdminGenres(
            allGenres.sort((a, b) => a.genre.localeCompare(b.genre))
        );
    }, [allGenres]);

    //Handle Edit genre
    const handleEdit = (genreId) => {
        setEditGenre(true)
        setSelectedId(genreId)
        setUpdate(true)
    }

    //Handle delete genre
    const handleDelete = (genreId) => {
        setDeleteGenre(true)
        setSelectedId(genreId)
        setUpdate(true)
    }

    // Render genres
    const renderGenres = adminGenres.map((genre, index) => (
        <div 
            key={index}
            className="adminGenreCard"
        >
            <div
                className="adminGenreContainer"
                style={{
                    backgroundImage: `url(${genre.image})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
            >
                <h2 className="adminGenreTitle">{genre.genre}</h2>
            </div>

            <div className="adminGenreOption">
                <EditButton 
                    className="adminOptionButton"
                    onClick={() => handleEdit(genre.id)}
                />   

                <DeleteButton 
                    className="adminOptionButton"
                    onClick={() => handleDelete(genre.id)}
                />
            </div>
        </div>
    ));

    return (
        <>
            <div id="adminGenreRoll">
                {renderGenres}
            </div>
        </>
    )
}
