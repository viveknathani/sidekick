import React from 'react';
import './Auth.css';

const LOGIN  = 0;
const SIGNUP = 1;
let selected = LOGIN;
const commonHeaders  =  { 'Content-Type': 'application/json' }

function selectLogin()
{
    selected = LOGIN;
    document.getElementById("login").style.backgroundColor = "#3700B3";
    document.getElementById("login").style.color = "#000000"
    document.getElementById("signup").style.backgroundColor = "#000000";
    document.getElementById("signup").style.color = "#FFFFFF"
}

function selectSignup()
{
    selected = SIGNUP;
    document.getElementById("signup").style.backgroundColor = "#3700B3";
    document.getElementById("signup").style.color = "#000000"
    document.getElementById("login").style.backgroundColor = "#000000";
    document.getElementById("login").style.color = "#FFFFFF";
}


class Auth extends React.Component
{
    constructor(props)
    {
        super(props);
        this.submitData = this.submitData.bind(this);
    }

    async submitData()
    {
        document.getElementById("server_response").innerText = "Please wait...";
        document.getElementById("server_response").style.color = "white";
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        if(selected === SIGNUP)
        {
            let response = await fetch('/auth/signup', {
                method: 'POST',
                headers: commonHeaders,
                body: JSON.stringify({email, password})
            });
            if(response.status === 201) 
            {
                document.getElementById("server_response").innerText = "Success!";
            }
        }
    }

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
                            <input placeholder="email" id="email"></input>
                            <input placeholder="password" type="password" id="password"></input>
                        </form>
                        <p id="server_response"></p>
                    </div>
                    <div id="bottom">
                        <button id="submit" onClick={this.submitData}>submit</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Auth;