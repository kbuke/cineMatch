


export default function LoggedHome({
    setLoggedUser
}){
    const logOut = () => {
        fetch("/logout", {
            method: "DELETE"
        })
        .then(r => {
            if(r.ok){
                setLoggedUser(null)
            }
        })
    }
    return(
        <button
            onClick={logOut}
        >Logout</button>
    )
}