import { useEffect, useState } from "react";

import "./SpecificFilmInfo.css";

import SpecificFilmGenres from "./SpecificFilmGenres";
import SpecificFilmCast from "./SpecificFilmCast";

export default function SpecificFilmInfo({
    selectFilmId,
    allFilms,
    allGenres,
    allFilmGenres,
    setAllFilmGenres,
    filmCasts,
    setFilmCasts
}){
    const [filterSpecificFilm, setFilterSpecificFilm] = useState();

    useEffect(() => {
        setFilterSpecificFilm(allFilms.filter(film => film.id === selectFilmId));
    }, [allFilms, selectFilmId]);

    console.log(filterSpecificFilm);

    const chosenFilm = filterSpecificFilm ? filterSpecificFilm[0] : null;
    console.log(chosenFilm);

    return (
        <div
            id="adminFilmInfo"
            style={{
                backgroundImage: `url(${chosenFilm?.background_image})`
            }}
        >
            <div
                id="adminSpecificFilmGrid"
            >
                <div
                    id="adminFilmTitleInfoContainer"
                >
                    <h1
                        className="adminSpecificFilmTitle"
                    >
                        {chosenFilm?.name}
                    </h1>

                    <h2
                        className="adminSpecificFilmSubTitle"
                    >
                        {chosenFilm?.sub_title}
                    </h2>

                    <h4>
                        {chosenFilm?.run_time_hours} Hour(s){" "}
                        {chosenFilm?.run_time_minutes?.toString().padStart(2, "0")} Minutes
                    </h4>
                </div>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "10px"
                    }}
                >
                    <div
                        id="adminFilmExtraInfo"
                    >
                        <h3
                            id="adminFilmSummary"
                        >
                            {chosenFilm?.summary}
                        </h3>
                    </div>

                    <div
                        id="adminFilmGenres"
                    >
                        <h2
                            style={{textAlign: "center"}}
                        >
                            Genres
                        </h2>
                        <SpecificFilmGenres 
                            selectFilmId={selectFilmId}
                            allGenres={allGenres}
                            allFilmGenres={allFilmGenres}
                            setAllFilmGenres={setAllFilmGenres}
                        />
                    </div>

                    <div
                        id="adminFilmCast"
                    >
                        <SpecificFilmCast 
                            selectFilmId={selectFilmId}
                            filmCasts={filmCasts}
                            setFilmCasts={setFilmCasts}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
