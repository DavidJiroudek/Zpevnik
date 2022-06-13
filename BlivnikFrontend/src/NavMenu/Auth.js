import { useState } from 'react';
import './Auth.css';

//tab Login
//handles authentication and registration
const Auth = ({ popupSet, logged}) => {
    const [isRegister, setIsRegister] = useState(false);
    //const [isRegister, setIsRegister] = useState(false);
    const handleInputChange = (event) => {
        

    }
    const [username, setUserName] = useState();
    const [password, setPassword] = useState();
    const [secondPassword, setSecondPassword] = useState();

    return (

        <div className="loginPopup">
            <div className="authMenu">
                <span className="exitButton" onClick={() => { popupSet(false) }}>✖</span>
                {isRegister === false ?
                    <div className="loginForm">
                        <h2>Přihlášení</h2>
                        <p>Přihlašovací jméno:</p>
                        <input type="text" onChange={e => setUserName(e.target.value)}></input>
                        <p>Heslo:</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        <button className='loginButton' onClick={() => tryLogIn({username, password}, logged)}>Přihlásit se</button>
                        <button className='loginButton' onClick={() => setIsRegister(true)}>Registrovat</button>
                    </div>
                    :
                    <div className="loginForm">
                        <h2>Registrace</h2>
                        <p>Přihlašovací jméno:</p>
                        <input type="text" onChange={e => setUserName(e.target.value)}></input>
                        <p>Heslo:</p>
                        <input type="password" onChange={e => setPassword(e.target.value)}></input>
                        <p>Znovu heslo:</p>
                        <input type="password" onChange={e => setSecondPassword(e.target.value)}></input>
                        <button className='loginButton' onClick={() => register({username, password}, secondPassword, logged)}>Zaregistrovat se</button>
                    </div>
                }
            </div>
        </div>
    )
}

const tryLogIn = (data, logged) =>{
    fetch('http://localhost:9000/users/login', {  

        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
      
      }).then(response => response.json())
        .then(result => {
            if (result.user === false){
                alert("Špatné jméno nebo heslo!")
            }else{
                localStorage.setItem("loginToken", result.token);
                logged(true)
            }

        });
}

const register = (data, secondPassword, logged) =>{
    if(data.password === secondPassword){
        fetch('http://localhost:9000/users/register', {  

        method: 'POST', 
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data) 
      
      }).then(response => response.json())
        .then(result => {
            localStorage.setItem("loginToken", result.token);
            logged(true)});
    }else{alert("Hesla se neshodují")}


}

export default Auth;