import loginWallpaper from "/Users/kaanbuke/Documents/codingProjects/cineMatch/client/src/assets/LoginWallpaper.webp";
import "./Login.css";

import { useState } from "react";

import SignUp from "./Components/2-SignUp";
import Socials from "./Components/3-Socials";
import SignIn from "./Components/1-SignIn";

export default function Login({ 
    Logo,
    instaLogo,
    loggedUser,
    setLoggedUser
}) {

    return (
        <div
            className="gridContainer"
            style={{
                display: "grid",
                gridTemplateRows: "10% 80% 10%",  // sets row heights
                gridTemplateColumns: "1fr",       // sets single column
                height: "100vh",
                overflow: "hidden"                  // makes container take full viewport height
            }}
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
                <SignUp />
            </div>

            <div className="socials">
                <Socials 
                    instaLogo={instaLogo}
                />
            </div>
        </div>
    );
}

