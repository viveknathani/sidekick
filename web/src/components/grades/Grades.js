import React from 'react';
import './Grades.css';

function getID(id) { return document.getElementById(id); }

class Grades extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            worry: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.checkStatus = this.checkStatus.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    checkStatus(array)
    {
        for(let i = 0; i < array.length; i++)
        {
            let num = array[i].scoredMarks;
            let dem = array[i].maxMarks;
            let percent = (num / dem) * 100;
            if(percent < 40) { return true; }
        }
        return false;
    }

    addData = (data) => {
        let newArray = JSON.parse(JSON.stringify(this.state.data));
        newArray = newArray.concat([data]);
        let newWorry = this.checkStatus(newArray);
        this.setState({data: newArray, worry: newWorry});
    }

    deleteData = (index) => {
        let newArray = JSON.parse(JSON.stringify(this.state.data));
        let dump = newArray.splice(index, 1);
        console.log(dump);
        let newWorry = this.checkStatus(newArray);
        this.setState({data: newArray, worry: newWorry});
    }

    handleSubmit = () => {
        const date = getID("date").value;
        const subject = getID("subject").value;
        const maxMarks = parseFloat(getID("max_marks").value);
        const scoredMarks = parseFloat(getID("scored_marks").value);
        const data = { date: date, subject: subject, maxMarks: maxMarks, scoredMarks: scoredMarks };
        this.addData(data);
    }

    show = (id) => { getID(id).style.display="block"; }
    hide = (id) => { getID(id).style.display="none"; }

    printStatus()
    {
        if(this.state.worry === true) return "Fail";
        return "Pass";
    }

    render()
    {
        return(
            <div>
                <div id="grades_main">
                    <div id="grades_title">
                        <p>Grades</p>
                    </div>
                    <div id="grades_summary">
                        <p>{this.printStatus()}</p>
                    </div>
                    <div id="grades_form">
                        <p id="g_f_head">Test data</p>
                        <label>Date</label>
                        <input id="date"></input>
                        <label>Subject</label>
                        <input id="subject"></input>
                        <label>Max Marks</label>
                        <input id="max_marks"></input>
                        <label>Scored Marks</label>
                        <input id="scored_marks"></input>
                        <button type="submit" onClick={this.handleSubmit}>submit</button> 
                    </div>
                    <button id="show" href="#" onClick={() => { this.show("grades_popup")}}>show list</button>
                    <div id="grades_popup">
                        <p>Grades list</p>
                        <table>
                            <thead>
                                <tr key={-1}>
                                    <th>Index</th>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Scored Marks</th>
                                    <th>Max Marks</th> 
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((datum, index) => (
                                    <tr key={index}>
                                        <td>{index}</td>
                                        <td>{datum.date}</td>
                                        <td>{datum.subject}</td>
                                        <td>{datum.scoredMarks}</td>
                                        <td>{datum.maxMarks}</td>
                                        <td><button onClick={() => this.deleteData(index)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <a href="#" onClick={() => { this.hide("grades_popup")}}>Close</a>
                    </div>
                </div>
            </div>
        );
    }
};

export default Grades;