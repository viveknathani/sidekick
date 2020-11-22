import React from 'react';
import Header from './header/Header';
import Expenses from './expenses/Expenses';
import Attend from './attendance/Attend';
import Grades from './grades/Grades';
import Welcome from './welcome/Welcome';
import Auth from './auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

const commonHeaders  =  { 'Content-Type': 'application/json' }

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id : -1,
            isAuthenticated: false
        }
    }

    componentDidMount()
    {
        if(localStorage.getItem("token") !== null)
        {
            let token = localStorage.getItem("token");
            fetch('/auth/verifyToken', {
                method: 'POST',
                headers: commonHeaders,
                body: JSON.stringify({token})
            }).then((res) => res.json())
            .then((data) => {
                this.setState({isAuthenticated: true, id: data.decoded.id});
            });
        }
    }

    render()
    {
        let validContent = (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/expenses" exact>
                            <Expenses id={this.state.id}/>
                        </Route>
                        <Route path="/attendance" exact>
                            <Attend id={this.state.id}/>
                        </Route>
                        <Route path="/grades" exact>
                            <Grades id={this.state.id}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );

        if(this.state.isAuthenticated)
        {
            return validContent;
        }
        else return (<Auth/>)
    }
};

export default App;