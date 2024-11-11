import App from "./App";
import Home from "./Pages/Home/Home";
import Login from "./Pages/LoginPg/Login";
import FaveGenre from "./Pages/InitialSignIn/Components/1-FaveGenres";
import FaveActors from "./Pages/InitialSignIn/Components/2-FaveActors";

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
                    }
                ]
            }
        ]
    }
]

export default routes