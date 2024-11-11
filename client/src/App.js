
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Logo from "./assets/Cine-Match.png"
import instaLogo from "./assets/insta.png"

function App() {

  const [loggedUser, setLoggedUser] = useState(false)

  const [allGenres, setAllGenres] = useState([])

  const [userGenres, setUserGenres] = useState([])

  useEffect(() => {
    fetch('/check_session')
    .then((r) => {
      if(r.ok){
        r.json()
        .then((loggedUser) => setLoggedUser(loggedUser))
      }
    })
  }, [])

  //Get all genres
  useEffect(() => {
    fetch("/genres")
    .then(r => {
      if(r.ok){
        r.json()
        .then(genres => setAllGenres(genres))
      }
    })
  }, [])

  //Get all user genres
  useEffect(() => {
    fetch("/user_genres")
    .then(r => {
      if(r.ok){
        r.json()
        .then(genres => setUserGenres(genres))
      }
    })
  }, [])


  return(
    <Home 
      Logo={Logo}
      instaLogo={instaLogo}

      loggedUser={loggedUser}
      setLoggedUser={setLoggedUser}

      allGenres={allGenres}
      setAllGenres={setAllGenres}

      userGenres={userGenres}
      setUserGenres={setUserGenres}
    />
  )
}

export default App;
