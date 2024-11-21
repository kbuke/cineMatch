import { useEffect, useState } from "react";
import "./AdminGenres.css";

export default function AdminGenres({
    allGenres,
    setAllGenres,
    AddButton,
    EditButton,
    DeleteButton,
}) {
    const [adminGenres, setAdminGenres] = useState([]);
    
    console.log(AddButton)

    useEffect(() => {
        setAdminGenres(
            allGenres.sort((a, b) => a.genre.localeCompare(b.genre))
        );
    }, [allGenres]);

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
                />   

                <DeleteButton 
                    className="adminOptionButton"
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
