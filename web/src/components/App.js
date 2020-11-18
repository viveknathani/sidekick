import React from 'react';
import Header from './header/Header';
import Expenses from './expenses/Expenses';
import Attend from './attendance/Attend';
import Grades from './grades/Grades';
import Welcome from './welcome/Welcome';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends React.Component
{
    render()
    {
        return(
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
        );
    }
};

export default App;