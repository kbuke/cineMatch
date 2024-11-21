import loginWallpaper from "/Users/kaanbuke/Documents/codingProjects/cineMatch/client/src/assets/LoginWallpaper.webp";
import "./Login.css";

import SignUp from "./Components/2-SignUp";
import Socials from "./Components/3-Socials";
import SignIn from "./Components/1-SignIn";

export default function Login({ 
    // Logo,
    // instaLogo,
    // loggedUser,
    // setLoggedUser,
    // allUsers,
    // setAllUsers
    appData,
    loggedUser
}) {
    const Logo = appData.Logo
    const instaLogo = appData.instaLogo
    const setLoggedUser = appData.setLoggedUser
    const allUsers = appData.allUsers
    const setAllUsers = appData.setAllUsers
    return (
        <div
            className="gridContainer"
        >
            <div id="logInHeader">
                <img 
                    src={Logo}
                    alt="cine-match logo"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                />

                <SignIn 
                    loggedUser={loggedUser}
                    setLoggedUser={setLoggedUser}
                />
            </div>

            <div
                style={{ 
                    backgroundImage: `url(${loginWallpaper})`,
                    backgroundSize: "cover",
                    height: "100%",     // makes div take full row height
                    width: "100%", 
                    display: "flex"
                }}
                className="signUpContainer"
            >
                <SignUp 
                    setAllUsers={setAllUsers}
                />
            </div>

            <div className="socials">
                <Socials 
                    instaLogo={instaLogo}
                />
            </div>
        </div>
    );
}

