import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SongList from './SongList/SongList';
import Home from './Home/Home';
import Navbar from './NavMenu/NavbarIndex';
import EditorInit from './Editor/EditorInit';
import Song from './SongList/Song';



//router for aplication
export default function NavMenu(){
  const [isLogged, setIsLogged] = useState(false);
  useEffect(() => {
    fetch('http://localhost:9000/users/isLogged', {  

      method: 'GET', 
      headers: { 'Content-Type': 'application/json', AuthToken: localStorage.getItem("loginToken") }
    
    }).then(response => response.json())
      .then(response => {
        if(response.isLogged === true){
          setIsLogged(true);
        }

      });
  },[]);


  if(true){
    return (
      <Router>
        <Navbar logged = {isLogged} setLogged = {setIsLogged} />
        <Routes>
          <Route path='/' exact element={<Home/>} />
          <Route path='/songList' element={<SongList/>} />
          <Route path='/Editor' element={<EditorInit/>} />
          <Route path='/song/:id' element={<Song/>} />
        </Routes>
    </Router>
    );
  }else{
    return (
    <Router>
    <Navbar logged = {isLogged} setLogged = {setIsLogged}/>
    <Routes>
      <Route path='/' exact element={<Home/>} />
      <Route path='/songList' element={<SongList/>} />
      <Route path='/song/:id' element={<Song/>} />
    </Routes>
  </Router>
  );

  }
}
