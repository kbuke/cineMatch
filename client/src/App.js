
import { useEffect, useState } from 'react';
import './App.css';
import Home from './Pages/Home/Home';
import Logo from "./assets/Cine-Match.png"
import instaLogo from "./assets/insta.png"

function App() {

  const [loggedUser, setLoggedUser] = useState(false)

  const [allGenres, setAllGenres] = useState([])

  const [userGenres, setUserGenres] = useState([])

  const [allUsers, setAllUsers] = useState([])

  const [allFollows, setAllFollows] = useState([])

  const [allProfilePictures, setAllProfilePictures] = useState([])

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

  //Get all users
  useEffect(() => {
    fetch("/users")
    .then(r => {
      if(r.ok){
        r.json()
        .then(users => setAllUsers(users))
      }
    })
  }, [])
  console.log(allUsers)

  //Get all followers
  useEffect(() => {
    fetch("/followers")
    .then(r => {
      if(r.ok){
        r.json()
        .then(followers => setAllFollows(followers))
      }
    })
  }, [])

  //get all profile pictures
  useEffect(() => {
    fetch("/profilepics")
    .then(r => {
      if(r.ok){
        r.json()
        .then(pics => setAllProfilePictures(pics))
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

      allUsers={allUsers}
      setAllUsers={setAllUsers}

      allFollows={allFollows}
      setAllFollows={setAllFollows}

      allProfilePictures={allProfilePictures}
      setAllProfilePictures={setAllProfilePictures}
    />
  )
}

export default App;
