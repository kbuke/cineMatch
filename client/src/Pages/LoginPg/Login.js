import loginWallpaper from "/Users/kaanbuke/Documents/codingProjects/cineMatch/client/src/assets/LoginWallpaper.webp";
import "./Login.css";

import { useState } from "react";

import SignUp from "./Components/2-SignUp";
import Socials from "./Components/3-Socials";

export default function Login({ 
    Logo,
    instaLogo
}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    //create login inputs
    const loginInputs = (ph, state, type) => {
        return (
            <input 
                placeholder={ph}
                onChange={(e) => state(e.target.value)}
                className="loginInput"
                type={type}
            />
        );
    };

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
                <form id="logInInputs">
                    {loginInputs("Please enter registered email address.", setEmail, "text")}
                    {loginInputs("Please enter your password", setPassword, "password")}
                    <button
                        type="submit"
                        style={{ width: "100px", borderRadius: "24px", cursor: "pointer", height:"50px" }}
                    >
                        Login
                    </button>
                </form>
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

