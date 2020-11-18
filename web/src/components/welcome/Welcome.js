import React from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

class Welcome extends React.Component
{
    render()
    {
        return(
            <div>
                <p id="welcome_main">Welcome to sidekick</p>
            </div>
        );
    }
};

export default Welcome;