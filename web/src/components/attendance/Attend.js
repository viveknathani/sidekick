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
const commonHeaders  =  { 'Content-Type': 'application/json' }

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
        this.getData = this.getData.bind(this);
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

    getData = () => {
        fetch(`/attendance/all/${this.props.id}`, {
            method: 'GET',
            headers: commonHeaders
        }).then((res) => res.json())
        .then((data) => {
            if(data.length !== 0)
            {
               let newArray = []; 
               for(let i = 0; i < data.length; i++)
               {
                   let newObject = {
                    id: data[i].user_id, 
                    subject_name: data[i].subject_name, 
                    date: data[i].date, 
                    status: data[i].status, 
                    attendance_id : data[i].attendance_id
                   }
                   newArray.push(newObject);
               }

               this.setState({
                   percent: this.calculatePercent(newArray),
                   data: newArray
               })
            }
        });
    }

    componentDidMount()
    {
        this.getData();
    }

    addData = (data) => {
        console.log(data);
        fetch('/attendance/data', {
            method: 'POST',
            headers: commonHeaders,
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    deleteData = (attendance_id) => {
        fetch('/attendance/data', {
            method: 'DELETE',
            headers: commonHeaders,
            body: JSON.stringify({attendance_id})
        }).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    handleSubmit = () => {
        const id =  this.props.id;
        const date = getID("date").value;
        const subject_name = getID("subject").value;
        const status = parseInt(radioInput("status").value);
        const data = { id: id, date: date, subject_name: subject_name, status: status };
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
                                        <td>{datum.subject_name}</td>
                                        <td>{datum.status}</td>
                                        <td><button onClick={() => this.deleteData(datum.attendance_id)}>Delete</button></td>
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