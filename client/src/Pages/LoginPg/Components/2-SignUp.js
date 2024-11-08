import { useState } from "react"
import "./2-SignUp.css"

export default function SignUp(){

    const [newEmail, setNewEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [city, setCity] = useState("")

    const signUpInput = (ph, state, type) => {
        return(
            <input 
                className="signUpInput"
                placeholder={ph}
                type={type}
                onChange={(e) => state(e.target.value)}
            />
        )
    }

    return(
        <form
            id="signUpForm"
        >
            <h1
                style={{fontWeight: "200", fontSize: "300%"}}
            >Sign Up</h1>

           {signUpInput("Please enter YOUR email", setNewEmail, "text")} 

           {signUpInput("Please enter your FIRST name", setFirstName, "text")}

           {signUpInput("Please enter your LAST name", setLastName, "text")}

           {signUpInput("Please enter your CITY", setCity, "text")}
        </form>
    )
}