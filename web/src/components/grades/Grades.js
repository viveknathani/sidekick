import React from 'react';
import './Grades.css';

function getID(id) { return document.getElementById(id); }

const commonHeaders  =  { 'Content-Type': 'application/json' }

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
        this.getData = this.getData.bind(this);
    }

    checkStatus(array)
    {
        for(let i = 0; i < array.length; i++)
        {
            let num = array[i].scored_marks;
            let dem = array[i].max_marks;
            let percent = (num / dem) * 100;
            if(percent < 40) { return true; }
        }
        return false;
    }

    getData = () => {
        fetch(`/grades/all/${this.props.id}`, {
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
                    max_marks: data[i].max_marks,
                    scored_marks : data[i].scored_marks, 
                    grades_id : data[i].grades_id
                   }
                   newArray.push(newObject);
               }

               this.setState({
                   data: newArray,
                   worry: this.checkStatus(newArray)
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
        fetch('/grades/test', {
            method: 'POST',
            headers: commonHeaders,
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    deleteData = (grades_id) => {
        fetch('/grades/test', {
            method: 'DELETE',
            headers: commonHeaders,
            body: JSON.stringify({grades_id})
        }).then((res) => res.json()).then((data) => console.log(data));
        window.location.reload();
    }

    handleSubmit = () => {
        const date = getID("date").value;
        const subject = getID("subject").value;
        const maxMarks = parseFloat(getID("max_marks").value);
        const scoredMarks = parseFloat(getID("scored_marks").value);
        const data = { id: this.props.id, date: date, subject_name: subject, max_marks: maxMarks, scored_marks: scoredMarks };
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
                                        <td>{datum.subject_name}</td>
                                        <td>{datum.scored_marks}</td>
                                        <td>{datum.max_marks}</td>
                                        <td><button onClick={() => this.deleteData(datum.grades_id)}>Delete</button></td>
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