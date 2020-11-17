import React from 'react';

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

        const newTransaction = { amount: amount, medium: medium, ttype: ttype, desc: desc };
        this.conductTransaction(newTransaction);
    }

    render()
    {
        return(
            <div>
               <div id="exp_main">
                   <div id="exp_summary">
                       <p>Cash : {this.state.summary.cash}</p>
                       <p>Bank : {this.state.summary.bank}</p>
                       <p>Ewallet : {this.state.summary.ewallet}</p>
                   </div>

                   <div id="exp_form">
                        <label for="amount">Amount</label>
                        <input id="amount" name="amount"></input>

                        <label for="desc">Description</label>
                        <input id="desc" name="desc"></input>

                        <label for="debit">Debit</label>
                        <input type="radio" name="ttype" id="debit" value={DEBIT}></input>
                        <label for="credit">Credit</label>
                        <input type="radio" name="ttype" id="credit" value={CREDIT}></input>

                        <label for="cash">Cash</label>
                        <input type="radio" name="medium" id="cash" value={CASH}></input>
                        <label for="bank">Bank</label>
                        <input type="radio" name="medium" id="bank" value={BANK}></input>
                        <label for="ewallet">Ewallet</label>
                        <input type="radio" name="medium" id="ewallet" value={EWALLET}></input>

                        <button type="submit" onClick={this.handleSubmit}>Submit</button>
                   </div>

                   <div id="exp_list">
                       <ol>
                           {this.state.transactions.map(
                               (transaction, index) => (
                                   <li key={index}>
                                       {transaction.amount} &nbsp; {transaction.ttype} &nbsp; {transaction.medium} &nbsp; {transaction.desc} &nbsp; {index}
                                       <button onClick={() => this.deleteTransaction(index)}>delete</button>
                                   </li>
                               )
                           )}
                       </ol>
                   </div>
               </div>
            </div>
        )
    }
};

export default Expenses;
