import { useEffect, useState } from "react";

import "./AdminFilms.css";

import AdminAddFilm from "./AdminAddFilm";
import SpecificFilmInfo from "./SpecificFilmInfo";

import { FaChevronDown } from "react-icons/fa";
import { FaChevronUp } from "react-icons/fa";

import { Link } from "react-router-dom";

export default function AdminFilms({
    allFilms,
    setAllFilms,
    AddButton,
    allGenres,
    allFilmGenres,
    setAllFilmGenres,
    filmCasts,
    setFilmCasts,
    allUsers
}) {
    const [registeredFilms, setRegisteredFilms] = useState([]);
    const [addFilm, setAddFilm] = useState(false);
    const [filterFilms, setFilterFilms] = useState("");
    const [selectFilmId, setSelectFilmId] = useState()

    useEffect(() => {
        if (filterFilms.trim() === "") {
            // Show all films when the filter is empty
            setRegisteredFilms(allFilms.sort((a, b) => new Date(b.release_date) - new Date(a.release_date)));
        } else {
            // Filter films based on the search input
            const filtered = allFilms.filter(
                (film) =>
                    film.name.toLowerCase().includes(filterFilms.toLowerCase()) ||
                    film.sub_title.toLowerCase().includes(filterFilms.toLowerCase())
            );
            setRegisteredFilms(filtered);
        }
    }, [allFilms, filterFilms]);

    // Render films
    const renderFilms = registeredFilms.length > 0
        ? registeredFilms.map((film, index) => (
            <div
                key={index}
                id="adminFilmContainer"
            >
                <Link
                    to={`/films/${film.id}`}
                >
                    <img
                        src={film.poster}
                        id="adminFilmPoster"
                    />
                </Link>

                <div id="adminFilmBasicInfo">
                    <h2
                        className="adminFilmTitle"
                        style={{ marginBottom: "0px" }}
                    >
                        {film.name}
                    </h2>

                    <h4
                        className="adminFilmSubTitle"
                        style={{
                            marginTop: "0px",
                            marginBottom: "4px",
                        }}
                    >
                        {film.sub_title}
                    </h4>

                    <h5 style={{ marginTop: "0px" }}>
                        ({film.release_date.slice(0, 4)})
                    </h5>

                    {film.id === selectFilmId ?
                        <FaChevronUp 
                            id="adminCloseFilmInfo"
                            onClick={() => setSelectFilmId()}
                        />
                        :
                        <FaChevronDown 
                            id="adminOpenFilmInfo"
                            onClick={() => setSelectFilmId(film.id)}
                        />
                    }
                </div>
            </div>
        ))
        : (
            <div
                style={{
                    textAlign: "center",
                    marginTop: "20px",
                    color: "gray",
                }}
            >
                No matches found.
            </div>
        );

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            {addFilm ? (
                <AdminAddFilm
                    setAllFilms={setAllFilms}
                    allFilms={allFilms}
                    setAddFilm={setAddFilm}
                />
            ) : null}

            <h2>Registered Films ({allFilms.length})</h2>

            <input
                type="text"
                onChange={(e) => setFilterFilms(e.target.value)}
                placeholder="See if a film is registered on Flix-Ation"
                id="filterAdminFilmInput"
            />

            <div id="adminFilmReel">{renderFilms}</div>

            {selectFilmId ?
                <SpecificFilmInfo 
                    selectFilmId={selectFilmId}
                    allFilms={allFilms}
                    allGenres={allGenres}
                    allFilmGenres={allFilmGenres}
                    setAllFilmGenres={setAllFilmGenres}
                    filmCasts={filmCasts}
                    setFilmCasts={setFilmCasts}
                    allUsers={allUsers}
                />
                :
                null
            }

            <AddButton
                id="adminAddButton"
                onClick={() => setAddFilm(true)}
            />

            <p
                style={{color: "red", textAlign: "center", marginTop: "0px"}}
            >
                {filterFilms ? `Add ${filterFilms} to Flix-Ation` : ""}
            </p>
        </div>
    );
}