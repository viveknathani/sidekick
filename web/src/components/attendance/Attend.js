import React from 'react';
import './Attend.css';

const PRESENT = 1, ABSENT = 0;

function radioInput(radioName)
{
    const array = document.getElementsByName(radioName);
    for(let i = 0; i < array.length; i++)
    {
        if(array[i].checked)
        {
            return array[i];
        }
    }
}

function getID(id) { return document.getElementById(id); }

function toFixed(value, precision) 
{
    let power = Math.pow(10, precision || 0);
    return String(Math.round(value * power) / power);
}

class Attend extends React.Component 
{
    constructor(props)
    {
        super(props);
        this.state = {
            data: [],
            percent: 0
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.addData = this.addData.bind(this);
        this.deleteData = this.deleteData.bind(this);
        this.calculatePercent = this.calculatePercent.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    calculatePercent(dataArray)
    {
        if(dataArray.length === 0 || dataArray === undefined) { return 0; }
        let count = 0;
        for(let i = 0; i < dataArray.length; i++)
        {
            if(dataArray[i].status === PRESENT ) { count = count + 1; }
        }
        const percent = (count / dataArray.length) * 100;
        return percent;
    }

    addData = (data) => {
        console.log(data);
        let newArray = JSON.parse(JSON.stringify(this.state.data));
        newArray = newArray.concat([data]);
        let newPercent = this.calculatePercent(newArray);
        this.setState({data: newArray, percent: newPercent});
    }

    deleteData = (index) => {
        let newArray = JSON.parse(JSON.stringify(this.state.data));
        let dump = newArray.splice(index, 1);
        console.log({dump});
        let newPercent = this.calculatePercent(newArray);
        this.setState({data: newArray, percent: newPercent});
    }

    handleSubmit = () => {
        const date = getID("date").value;
        const subject = getID("subject").value;
        const status = parseInt(radioInput("status").value);
        const data = { date: date, subject: subject, status: status };
        this.addData(data);
    }

    show = (id) => { getID(id).style.display="block"; }
    hide = (id) => { getID(id).style.display="none"; }

    render()
    {
        return(
            <div>
                <div id="attend_main">
                    <div id="attend_title">
                        <p>Attendance</p>
                    </div>
                    <div id="attend_summary">
                        <p>{toFixed(this.state.percent, 2)}%</p>
                    </div>
                    <div id="attend_form">
                        <p id="a_f_head">Data</p>
                        <label>Date</label>
                        <input id="date"></input>
                        <label>Subject</label>
                        <input id="subject"></input>
                        <div id="set_status">
                            <p>Status</p>
                            <label>Present</label>
                            <input id="status" name="status" type="radio" value={PRESENT}></input>
                            <label>Absent</label>
                            <input id="status" name="status" type="radio" value={ABSENT}></input>
                            <button type="submit" onClick={this.handleSubmit}>submit</button> 
                        </div>
                    </div>
                    <button id="show" href="#" onClick={() => { this.show("attend_popup")}}>show list</button>
                    <div id="attend_popup">
                        <p>Attendance list</p>
                        <table>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Date</th>
                                    <th>Subject</th>
                                    <th>Status</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.data.map((datum, index) => (
                                    <tr>
                                        <td>{index}</td>
                                        <td>{datum.date}</td>
                                        <td>{datum.subject}</td>
                                        <td>{datum.status}</td>
                                        <td><button onClick={() => this.deleteData(index)}>Delete</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <a href="#" onClick={() => { this.hide("attend_popup")}}>Close</a>
                    </div>
                </div>
            </div>
        );
    }
};

export default Attend;