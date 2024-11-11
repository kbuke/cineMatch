import { useState } from "react";

export default function SignIn({
    loggedUser, 
    setLoggedUser
}){
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [signInError, setSignInError] = useState(false)

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

    const handleLogin = (e) => {
        e.preventDefault()
        fetch("/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userEmail, userPassword})
        }).then((r) => {
            if(r.ok) {
                return r.json()
            } else {
                setSignInError(true)
            }
        })
        .then(user => {
            if(user) {
                setLoggedUser(user)
            }
        })
    }

    return(
        <form id="logInInputs" onSubmit={handleLogin}>
            <>
                {loginInputs("Please enter registered email address.", setUserEmail, "text")}
                {loginInputs("Please enter your password", setUserPassword, "password")}
                <button
                    type="submit"
                    style={{ width: "100px", borderRadius: "24px", cursor: "pointer", height:"50px" }}
                >
                    Login
                </button>
            </>
            {!signInError? 
                null
                :
                <p
                    style={{color: "red"}}
                >
                    Incorrect Login Details
                </p>
            }
        </form>
    )
}