import App from "./App";
import Home from "./Pages/Home/Home";
import Login from "./Pages/LoginPg/Login";
import FaveGenre from "./Pages/InitialSignIn/Components/1-FaveGenres";
import FaveActors from "./Pages/InitialSignIn/Components/2-FaveActors";
import Admin from "./Pages/Admin/Admin";
import LoggedHome from "./Pages/LoggedInHome/LoggedHome";
import Actors from "./Pages/Actors/Actors";
import SpecificFilms from "./Pages/SpecificFilms/SpecificFilms";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />,
                children: [
                    {
                        path: "/",
                        element: <Login />
                    },
                    {
                        path: "/initialgenres",
                        element: <FaveGenre />
                    },
                    {
                        path: "/initialactors",
                        element: <FaveActors/>
                    },
                ]
            },
            {
                path: "/",
                element: <LoggedHome />,
            },
            {
                path: "/admin",
                element: <Admin />
            },
            {
                path: "/actors",
                element: <Actors />
            },
            {
                path: "/films/:id",
                element: <SpecificFilms />
            }
        ]
    }
]

export default routes