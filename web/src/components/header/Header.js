import React from 'react';
import './Header.css';
import { Link } from 'react-router-dom';

class Header extends React.Component
{
    render()
    {
        return(
            <div>
                <div id="sidekick_head">
                    <Link to="/" className="Link">
                        <p>sidekick</p>
                    </Link>
                    <ul>
                        <Link to="/expenses" className="Link">
                            <li>Expenses</li>
                        </Link>

                        <Link to="attendance" className="Link">
                            <li>Attendance</li>
                        </Link>

                        <Link to="grades" className="Link">
                            <li>Grades</li>
                        </Link>
                    </ul>
                </div>
            </div>
        );
    }
};

export default Header;