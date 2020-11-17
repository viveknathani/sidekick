import React from 'react';
import './Expenses.css';

const CASH = 0, BANK = 1, EWALLET = 2;
const DEBIT = 0, CREDIT = 1;

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
function show(id)  { getID(id).style.display="block"; }
function hide(id)  { getID(id).style.display="none"; }

class Expenses extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = { 
            summary : { cash : 0, bank : 0, ewallet: 0 }, 
            transactions: [] 
        }

        this.handleSubmit = this.handleSubmit.bind(this);
        this.conductTransaction = this.conductTransaction.bind(this);
        this.deleteTransaction = this.deleteTransaction.bind(this);
        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
    }

    conductTransaction = (transaction) => {
        let amount = transaction.amount;
        const medium = transaction.medium;
        const ttype  = transaction.ttype;
        const desc = transaction.desc;
        if(ttype === DEBIT) { amount = amount * -1; }

        let stateCash = this.state.summary.cash;
        let stateBank = this.state.summary.bank;
        let stateEwallet   = this.state.summary.ewallet;
        if(medium === CASH) { stateCash = stateCash + amount; }
        if(medium === BANK) { stateBank = stateBank + amount; }
        if(medium === EWALLET) { stateEwallet = stateEwallet + amount; }

        const newSummaryObject = { cash: stateCash, bank: stateBank, ewallet: stateEwallet, desc: desc};
        let newArray = JSON.parse(JSON.stringify(this.state.transactions));
        newArray = newArray.concat([transaction]);

        this.setState({summary: newSummaryObject, transactions: newArray});
    }

    deleteTransaction = (index) => {
        let amount = this.state.transactions[index].amount;
        const medium = this.state.transactions[index].medium;
        const ttype  = this.state.transactions[index].ttype;
        if(ttype === CREDIT) { amount = amount * -1; }

        let stateCash = this.state.summary.cash;
        let stateBank = this.state.summary.bank;
        let stateEwallet   = this.state.summary.ewallet;
        if(medium === CASH) { stateCash = stateCash + amount; }
        if(medium === BANK) { stateBank = stateBank + amount; }
        if(medium === EWALLET) { stateEwallet = stateEwallet + amount; }

        const newSummaryObject = { cash: stateCash, bank: stateBank, ewallet: stateEwallet };
        let newArray = JSON.parse(JSON.stringify(this.state.transactions));
        let dump = newArray.splice(index, 1);
        console.log({dump});
        this.setState({summary: newSummaryObject, transactions: newArray});
    }

    handleSubmit()
    {
        const amount = parseInt(getID("amount").value);
        const ttype = parseInt(radioInput("ttype").value);
        const medium = parseInt(radioInput("medium").value);
        const desc = getID("desc").value;
        console.log(ttype);

        const newTransaction = { amount: amount, medium: medium, ttype: ttype, desc: desc };
        this.conductTransaction(newTransaction);
        setTimeout(()=>console.log(this.state), 1000)
    }

    show = (id) => { getID(id).style.display="block"; }
    hide = (id) => { getID(id).style.display="none"; }

    render()
    {
        return(
            <div>
               <div id="exp_main">
                   <div id="exp_title">
                        <p>Expenses</p>
                   </div>
                   <div id="exp_summary">
                       <p id="exp_s_head">Summary</p>
                       <p>Cash : {this.state.summary.cash}</p>
                       <p>Bank : {this.state.summary.bank}</p>
                       <p>Ewallet : {this.state.summary.ewallet}</p>
                   </div>

                   <div id="exp_form">
                        <p id="exp_f_head">New transaction</p>
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount"></input>

                        <label for="desc">Description</label>
                        <input id="desc" name="desc"></input>
                        
                        <div id="set_ttype">
                        <p>Transaction type</p>
                        <label for="debit">Debit</label>
                        <input type="radio" name="ttype" id="debit" value={DEBIT}></input>
                        <label for="credit">Credit</label>
                        <input type="radio" name="ttype" id="credit" value={CREDIT}></input>
                        </div>

                        <div id="set_medium">
                        <p>Transaction medium</p>
                        <label for="cash">Cash</label>
                        <input type="radio" name="medium" id="cash" value={CASH}></input>
                        <label for="bank">Bank</label>
                        <input type="radio" name="medium" id="bank" value={BANK}></input>
                        <label for="ewallet">Ewallet</label>
                        <input type="radio" name="medium" id="ewallet" value={EWALLET}></input>
                        </div>

                        <button type="submit" onClick={this.handleSubmit}>submit</button> 
                   </div>
                    <button id="show" href="#" onClick={() => { this.show("exp_popup")}}>show list</button>

                   <div id="exp_popup">
                        <p>Transaction list</p>
                        <table>
                            <tr>
                                <th>Index</th>
                                <th>Amount</th>
                                <th>Description</th>
                                <th>Type</th>
                                <th>Medium</th>
                                <th>Delete</th>
                            </tr>
                            {this.state.transactions.map(
                               (transaction, index) => (
                                   <tr>
                                        <td>{index}</td>
                                        <td>{transaction.amount}</td>
                                        <td>{transaction.desc}</td>
                                        <td>{transaction.ttype}</td>
                                        <td>{transaction.medium}</td>
                                        <td><button onClick={() => this.deleteTransaction(index)}>Delete</button></td>
                                   </tr>
                               )
                           )}

                        </table>
                       <a href="#" onClick={() => { this.hide("exp_popup")}}>Close</a>
                   </div>
               </div>
            </div>
        )
    }
};

export default Expenses;
