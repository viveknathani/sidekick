import React from 'react';
import './Auth.css';

function selectLogin()
{
    document.getElementById("login").style.backgroundColor = "#3700B3";
    document.getElementById("login").style.color = "#000000"
    document.getElementById("signup").style.backgroundColor = "#000000";
    document.getElementById("signup").style.color = "#FFFFFF"
}

function selectSignup()
{
    document.getElementById("signup").style.backgroundColor = "#3700B3";
    document.getElementById("signup").style.color = "#000000"
    document.getElementById("login").style.backgroundColor = "#000000";
    document.getElementById("login").style.color = "#FFFFFF";
}

class Auth extends React.Component
{
    render()
    {
        return(
            <div>
                <div id="auth_main">
                    <div id="top">
                        <button id="signup" onClick={selectSignup}>signup</button>
                        <button id="login" onClick={selectLogin}>login</button>
                    </div>

                    <div id="mid">
                        <form>
                            <input placeholder="email" ></input>
                            <input placeholder="password" type="password"></input>
                        </form>
                    </div>

                    <div id="bottom">
                        <button id="submit">submit</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Auth;