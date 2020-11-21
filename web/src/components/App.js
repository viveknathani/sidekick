import React from 'react';
import Header from './header/Header';
import Expenses from './expenses/Expenses';
import Attend from './attendance/Attend';
import Grades from './grades/Grades';
import Welcome from './welcome/Welcome';
import Auth from './auth/Auth';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id : -1
        }
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.parentUpdate = this.parentUpdate.bind(this);
    }

    parentUpdate()
    {
        this.forceUpdate();
    }

    async isAuthenticated()
    {
       try 
       {
           let token = localStorage.getItem("token");
           let response = await fetch('/auth/verifyToken', {
               method: 'POST',
               body:JSON.stringify({token})
           });

           if(response.id) {
               this.setState({id: parseInt(response.id)});
               return true;
           }
           else
           {
               return false;
           }
       }

       catch(err)
       {
           console.log(err);
           return false;
       }
    }

    render()
    {
        let content = this.isAuthenticated ? (<Auth parentUpdate={this.parentUpdate}/>) : (
            <Router>
                <div className="App">
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Welcome}/>
                        <Route path="/expenses" exact component={Expenses}/>
                        <Route path="/attendance" exact component={Attend}/>
                        <Route path="/grades" exact component={Grades}/>
                    </Switch>
                </div>
            </Router>
        )
        return content;
    }
};

export default App;