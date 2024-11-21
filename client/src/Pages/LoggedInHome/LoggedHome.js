import Admin from "../Admin/Admin"



export default function LoggedHome({
    setLoggedUser
}){
    const logOut = () => {
        console.log("signing out")
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
        <>
            <button
                onClick={() => logOut()}
            >
                LogOut
            </button>
        </>
    )
}