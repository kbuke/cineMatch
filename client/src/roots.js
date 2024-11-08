import App from "./App";
import Home from "./Pages/Home/Home";
import Login from "./Pages/LoginPg/Login";

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
                    }
                ]
            }
        ]
    }
]

export default routes