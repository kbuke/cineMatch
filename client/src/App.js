
import './App.css';
import Home from './Pages/Home/Home';
import Logo from "./assets/Cine-Match.png"
import instaLogo from "./assets/insta.png"

function App() {
  return(
    <Home 
      Logo={Logo}
      instaLogo={instaLogo}
    />
  )
}

export default App;
