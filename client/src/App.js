
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Logo from "./assets/Cine-Match.png"
import instaLogo from "./assets/insta.png"

function App() {

  const [loggedUser, setLoggedUser] = useState(false)

  useEffect(() => {
    fetch('/check_session')
    .then((r) => {
      if(r.ok){
        r.json()
        .then((loggedUser) => setLoggedUser(loggedUser))
      }
    })
  }, [])

  console.log(loggedUser)


  return(
    <Home 
      Logo={Logo}
      instaLogo={instaLogo}
      loggedUser={loggedUser}
      setLoggedUser={setLoggedUser}
    />
  )
}

export default App;
