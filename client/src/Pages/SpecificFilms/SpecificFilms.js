import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

export default function SpecificFilms() {
    const appData = useOutletContext();
    const params = useParams();

    const [specificFilm, setSpecificFilm] = useState([]);

    // Fetch all films registered on app
    const allFilms = appData?.allFilms;
    const chosenFilm = allFilms?.find(film => film.id === parseInt(params.id));
    const filmId = chosenFilm?.id;

    console.log(filmId);

    useEffect(() => {
        if (filmId) {
            fetch(`/films/${filmId}`)
                .then(r => {
                    if (r.ok) {
                        return r.json();
                    }
                    throw r;
                })
                .then(specificFilm => setSpecificFilm(specificFilm))
                .catch(error => console.error("Error fetching film:", error));
        }
    }, [filmId]); // Use only `filmId` as the dependency

    console.log(specificFilm);
}
