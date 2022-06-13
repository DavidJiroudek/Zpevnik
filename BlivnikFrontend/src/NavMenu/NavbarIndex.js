import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Auth from './Auth';
import './NavMenu.css';
  
//upper menu with elements
const Navbar = ({logged, setLogged}) => {
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  // useEffect(() => {
  //   setIsLogged(isLogged);
  // },[]);


  if(logged === true){
  return (
    <>
        <nav className='navMenu'>
        <div className='navLink' onClick={() => logOut(setLogged, setShowLoginPopup)}>Odhlásit</div>
        <Link className='navLink' to='/Editor'>
            <span>Editor</span>
        </Link>
        <Link className='navLink' to='/SongList'>
            <span>SongList</span>
        </Link>
        <Link className='logo' to='/'>
            Blivník
        </Link>
        </nav>

    </>
  );
  }else{
    return (
      <>
          {showLoginPopup === false ? "" : <Auth popupSet = {setShowLoginPopup} logged = {setLogged}/>} 
          <nav className='navMenu'>
          <div className='navLink' onClick={() => setShowLoginPopup(!showLoginPopup)}>Login</div>
          <Link className='navLink' to='/SongList'>
              <span>SongList</span>
          </Link>
          <Link className='logo' to='/'>
              Blivník
          </Link>
          </nav>
      </>
    );


  }
};
  
const logOut = (setLogged, setShowLoginPopup) => {
  // fetch('http://localhost:9000/users/logOut', {  

  //   method: 'POST', 
  //   headers: { 'Content-Type': 'text/plain' },
  //   body: localStorage.getItem("loginToken")
  
  // }).then(response => response.json())
  //   .then(response => {
  //     if(response.isLogged === true){
  //       setIsLogged(true);
  //     }

  //   });
    localStorage.removeItem("loginToken");
    setShowLoginPopup(false);
    setLogged(false);
}

export default Navbar;